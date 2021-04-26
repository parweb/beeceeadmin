const fetch = require('fetch').fetchUrl;
const fs = require('fs');
const sharp = require('sharp');
const md5 = require('md5');
const eml2png = require('eml2png');
const pngenerator = require('pngenerator');
const detectCharacterEncoding = require('detect-character-encoding');
const simpleParser = require('mailparser').simpleParser;
const puppeteer = require('puppeteer');

const parseAttachments = require('../helpers/parseAttachments');

const apiPreview = process.env.API_PREVIEW;

const format = input => input.split('.').reverse()[0].toLowerCase();
const cache = {};

const fetchAsync = input =>
  new Promise((resolv, reject) => {
    fetch(input, (error, _, body) => {
      if (error) reject(error);
      resolv(body);
    });
  });

const pngeneratorAsync = (input, output, options) =>
  new Promise((resolv, reject) => {
    pngenerator.generate(input, output, options, error => {
      if (error) reject(error);
      resolv();
    });
  });

const path = process.env.PATH_TMP || '/app/tmp/';

const converter = new eml2png();

module.exports = (app, opts, next) => {
  app.get('/image', async (request, reply) => {
    reply.type('image/png');

    const { url: input, width: _width, height: _height } = request.query;

    const width = parseInt(_width) || null;
    const height = parseInt(_height) || null;

    const resize = { ...(width && { width }), ...(height && { height }) };
    const resizeable = !!Object.entries(resize).length;

    const cacheKeyMax = md5(input);
    let outputMax = path + cacheKeyMax + '.png';
    let outputMaxFirst = path + cacheKeyMax + 'first.png';
    let resized = path + cacheKeyMax + 'resized.png';

    console.log({ cacheKey: input + '-' + width + '-' + height });
    console.log({ resizeable });

    const cacheKey = md5(input + '-' + width + '-' + height);
    let output = path + cacheKey + '.png';

    if (fs.existsSync(output)) {
      const { size } = fs.lstatSync(output);
      if (size === 0 || size === 1364) {
        fs.unlinkSync(output);
      }
    }

    console.log('output', output);

    try {
      if (fs.existsSync(output)) {
        console.log('existsSync');
        app.log.info(['cacheKey', cacheKey, { output }]);
        const stream = fs.readFileSync(output);
        reply.send(stream);
      } else {
        console.log('not existsSync');
        app.log.info({ input, output, format: format(input) });
        fs.writeFileSync(output, '');

        if (format(input) === 'eml') {
          if (resizeable) {
            const inputTmp = path + cacheKeyMax + '.eml';
            let body = await fetchAsync(input);

            let { attachments } = await simpleParser(body);
            htmlUrl = await parseAttachments(attachments);
            if (htmlUrl !== null) {
              console.log({ api: request.url, query: request.query, htmlUrl });

              reply.redirect(
                `${apiPreview}${request.url.replace(
                  request.query.url,
                  htmlUrl
                )}`.replace(
                  process.env.NAMESPACE + process.env.NAMESPACE,
                  process.env.NAMESPACE
                )
              );
              return;
            }

            const { encoding } = detectCharacterEncoding(body);

            fs.writeFileSync(inputTmp, body);

            console.log({ encoding });

            const data = fs.readFileSync(inputTmp);
            const result = await converter.png(data, {}, outputMax);

            try {
              await sharp(outputMax).trim().toFile(resized);
            } catch (e) {
              resized = outputMax;
            }

            try {
              if (resizeable) {
                await sharp(resized).resize(resize).toFile(output);
              } else {
                output = resized;
              }
            } catch (e) {
              console.log(e);
              output = resized;
            }

            const stream = fs.readFileSync(output);

            reply.send(stream);
          } else {
            const body = await fetchAsync(input);
            let {
              html,
              text,
              textAsHtml,
              from,
              attachments
            } = await simpleParser(body);

            htmlUrl = await parseAttachments(attachments);

            if (htmlUrl !== null) {
              reply.redirect(`${apiPreview}/image/?url=${htmlUrl}`);
            } else {
              if (html) {
                reply
                  .code(200)
                  .header('Content-Type', 'text/html; charset=utf-8')
                  .send(html);
              } else {
                reply
                  .code(200)
                  .header('Content-Type', 'text/plain; charset=utf-8')
                  .send(text);
              }
            }
          }
        } else if (['pdf'].includes(format(input)) && !resizeable) {
          reply.type('application/pdf');
          reply.header(
            'Content-Security-Policy',
            "script-src 'self' http://localhost/;"
          );

          const pdf = outputMax + '.pdf';
          const body = await fetchAsync(input);
          fs.writeFileSync(pdf, body);

          const stream = fs.readFileSync(pdf);
          reply.send(stream);
        } else if (['html'].includes(format(input)) && !resizeable) {
          realinput = input.replace('html', 'html');

          reply.header(
            'Content-Type',
            'text/html; charset=utf-8',
            'Content-Security-Policy',
            "script-src 'self' http://localhost/;"
          );

          const html = outputMax + '.html';
          const body = await fetchAsync(realinput);
          fs.writeFileSync(html, body);

          const stream = fs.readFileSync(html);
          reply.send(stream);
        } else if (['jpg', 'png', 'bmp'].includes(format(input))) {
          const body = await fetchAsync(input);
          fs.writeFileSync(outputMax, body);

          try {
            await sharp(outputMax).trim().toFile(resized);
          } catch (e) {
            resized = outputMax;
          }

          try {
            if (resizeable) {
              await sharp(resized).resize(resize).toFile(output);
            } else {
              output = resized;
            }
          } catch (e) {
            console.log(e);

            output = resized;
          }

          const stream = fs.readFileSync(output);
          reply.send(stream);
        } else {
          try {
            if (resizeable) {
              if (['html'].includes(format(input))) {
                const browser = await puppeteer.launch({
                  args: ['--no-sandbox']
                });
                const page = await browser.newPage();
                await page.goto(input);
                await page.screenshot({ path: outputMaxFirst });

                await browser.close();
              } else {
                pngenerator.generateSync(input, outputMaxFirst, {
                  quality: 100
                });
              }

              // try {
              // await sharp(outputMaxFirst).trim().toFile(resized);
              // } catch (e) {
              resized = outputMaxFirst;
              // }

              try {
                await sharp(resized).resize(resize).toFile(output);
              } catch (e) {
                console.log(e);
                output = resized;
              }

              const stream = fs.readFileSync(output);
              reply.send(stream);
              return;
            } else {
              if (!fs.existsSync(outputMax)) {
                await pngeneratorAsync(input, outputMax, {
                  quality: 100,
                  pagerange: '1-50'
                });
              }
            }

            // try {
            // await sharp(outputMax).trim().toFile(resized);
            // } catch (e) {
            resized = outputMax;
            // }

            output = resized;

            const stream = fs.readFileSync(output);
            reply.send(stream);
          } catch (error) {
            console.log(error);
            throw new Error('Cannot performe generation for ' + input);
          }
        }

        cache[cacheKey] = true;

        if (fs.lstatSync(output).size === 0) {
          fs.unlinkSync(output);
        }
      }
    } catch (e) {
      app.log.error(e);
      const body = await fetchAsync('https://via.placeholder.com/400x300.png');
      fs.writeFileSync(output, body);
      const stream = fs.readFileSync(output);
      reply.send(stream);
    }
  });

  next();
};
