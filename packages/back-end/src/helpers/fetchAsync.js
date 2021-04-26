const fetch = require('fetch').fetchUrl;

const fetchAsync = input =>
  new Promise((resolv, reject) => {
    fetch(input, (error, _, body) => {
      if (error) reject(error);
      resolv(body);
    });
  });

module.exports = fetchAsync;
