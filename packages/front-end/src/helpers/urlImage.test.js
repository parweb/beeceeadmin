import { urlImage } from 'helpers';

test('urlImage', () => {
  process.env.REACT_APP_API = 'http://myurl.com';

  const input = 'test';

  const output = urlImage(input);

  expect(output).toBe('http://myurl.com/image/?url=test');
});
