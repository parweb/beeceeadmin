import { format } from 'helpers';

test('format', () => {
  const expectations = [
    { input: 'zeglhzeglez.pdf', output: 'pdf' },
    { input: 'zeglhzeglez.jpg', output: 'jpg' },
    { input: '.jpg', output: 'jpg' },
    { input: 'zelgjzelg', output: 'zelgjzelg' },
    { input: 'ze.l.jze.lg.jpg', output: 'jpg' },
    { input: '', output: '' }
  ];

  for (let { input, output } of expectations) {
    expect(format(input)).toBe(output);
  }
});
