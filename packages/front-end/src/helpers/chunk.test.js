import { chunk } from 'helpers';

describe('chunk', () => {
  test('by 0 when 3 in the list', () => {
    const input = [[1, 2, 3], 0];
    const output = chunk(...input);

    expect(output).toStrictEqual([1, 2, 3]);
  });

  test('by 1 when 3 in the list', () => {
    const input = [[1, 2, 3], 1];
    const output = chunk(...input);

    expect(output).toStrictEqual([[1], [2], [3]]);
  });

  test('by 3 when 3 in the list', () => {
    const input = [[1, 2, 3], 3];
    const output = chunk(...input);

    expect(output).toStrictEqual([[1, 2, 3]]);
  });

  test('by 3 when 4 in the list', () => {
    const input = [[1, 2, 3, 4], 3];
    const output = chunk(...input);

    expect(output).toStrictEqual([[1, 2, 3], [4]]);
  });
});
