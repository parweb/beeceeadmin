import { applyBrightness } from 'helpers';

describe('applyBrightness', () => {
  test('brightness at 0', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 0];
    const output = applyBrightness(...input);

    expect(output).toStrictEqual({ data: [1, 2, 3, 4, 5, 6, 7, 8] });
  });

  test('brightness at 50', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, 50];
    const output = applyBrightness(...input);

    expect(output).toStrictEqual({
      data: [128.5, 129.5, 130.5, 4, 132.5, 133.5, 134.5, 8]
    });
  });

  test('brightness at -50', () => {
    const input = [{ data: [1, 2, 3, 4, 5, 6, 7, 8] }, -50];
    const output = applyBrightness(...input);

    expect(output).toStrictEqual({
      data: [-126.5, -125.5, -124.5, 4, -122.5, -121.5, -120.5, 8]
    });
  });
});
