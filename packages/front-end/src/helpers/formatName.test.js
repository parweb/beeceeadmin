import { formatName } from 'helpers';

test('format name file', () => {
  const expectations = [
    { input: 'zeglhzeglez.pdf', output: 'zeglhzeglez' },
    { input: 'zeglhzeglez.jpg', output: 'zeglhzeglez' },
    { input: 'zelgjzelg', output: 'zelgjzelg' },
    { input: '', output: '' }
  ];

  for (let { input, output } of expectations) {
    expect(formatName(input)).toBe(output);
  }
});
