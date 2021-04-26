import { filterByExtension } from 'helpers';

describe('filterByExtension', () => {
  test('equal "tous"', () => {
    const input = ['tous', { preview: 'any.way' }];

    const output = filterByExtension(input[0])(input[1]);

    expect(output).toBeTruthy();
  });

  test('equal "pdf"', () => {
    const input = ['pdf', { preview: 'any.pdf' }];

    const output = filterByExtension(input[0])(input[1]);

    expect(output).toBeTruthy();
  });

  test('not equal "pdf"', () => {
    const input = ['pdf', { preview: 'any.jpg' }];

    const output = filterByExtension(input[0])(input[1]);

    expect(output).toBeFalsy();
  });

  test('handle empty file', () => {
    const input = ['pdf', { preview: '' }];

    const output = filterByExtension(input[0])(input[1]);

    expect(output).toBeFalsy();
  });

  test('inclusive criteria', () => {
    const orFilter = (searches, callback, item, start) =>
      searches.reduce(
        (carry, search) => carry || callback(search)(item),
        start
      );

    expect(
      orFilter(
        ['pdf', 'csv'],
        filterByExtension,
        { preview: 'file.pdf' },
        false
      )
    ).toBeTruthy();
    expect(
      orFilter(
        ['pdf', 'csv'],
        filterByExtension,
        { preview: 'file.csv' },
        false
      )
    ).toBeTruthy();
  });
});
