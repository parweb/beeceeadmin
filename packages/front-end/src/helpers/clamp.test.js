import { clamp } from 'helpers';

describe('clamp', () => {
  test('value -100', () => {
    const input = -100;

    const output = clamp(input);

    expect(output).toBe(0);
  });

  test('value 200', () => {
    const input = 200;

    const output = clamp(input);

    expect(output).toBe(200);
  });

  test('value 300', () => {
    const input = 300;

    const output = clamp(input);

    expect(output).toBe(255);
  });
});
