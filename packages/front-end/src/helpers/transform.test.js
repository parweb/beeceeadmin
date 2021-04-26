import { transform } from 'helpers';

describe('transform', () => {
  test('rotate, scale, translate', () => {
    const input = { rotate: 1, scale: 1, translate: { x: 1, y: 1 } };

    const output = transform(input);

    expect(output).toBe('scale(1) rotate(1deg) translate(1px, 1px)');
  });
});
