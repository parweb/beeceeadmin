import { applySaturation } from 'helpers';

describe('applySaturation', () => {
  test('saturation at 0', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 0];
    const output = applySaturation(...input);

    expect(output).toStrictEqual({
      data: [
        1.7734,
        1.7734,
        1.7734,
        4,
        5.7734000000000005,
        5.7734000000000005,
        5.7734000000000005,
        8
      ]
    });
  });

  test('saturation at 1', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 1];
    const output = applySaturation(...input);

    expect(output).toStrictEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8]
    });
  });

  test('saturation at 2', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 2];
    const output = applySaturation(...input);

    expect(output).toStrictEqual({
      data: [
        0.2265999999999999,
        2.2266,
        4.2265999999999995,
        4,
        4.2266,
        6.2266,
        8.2266,
        8
      ]
    });
  });
});
