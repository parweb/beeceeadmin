import { applyContrast } from 'helpers';

describe('applyContrast', () => {
  test('contrast at 0', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 0];
    const output = applyContrast(...input);

    expect(output).toStrictEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8]
    });
  });

  test('contrast at 50', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 50];
    const output = applyContrast(...input);

    expect(output).toStrictEqual({
      data: [0, 0, 0, 4, 0, 0, 0, 8]
    });
  });

  test('contrast at -50', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, -50];
    const output = applyContrast(...input);

    expect(output).toStrictEqual({
      data: [
        42.42267910400406,
        43.09651627641347,
        43.77035344882289,
        4,
        45.11802779364173,
        45.791864966051136,
        46.46570213846056,
        8
      ]
    });
  });
});
