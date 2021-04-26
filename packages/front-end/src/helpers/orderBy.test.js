import { orderBy } from 'helpers';

describe('orderBy', () => {
  test('url asc', () => {
    const input = [
      ['url', 'asc'],
      [{ url: 'file.pdf' }, { url: 'file.jpg' }]
    ];

    const output = orderBy(...input[0])(...input[1]);

    expect(output).toBe(1);
  });

  test('url desc', () => {
    const input = [
      ['url', 'desc'],
      [{ url: 'file.pdf' }, { url: 'file.jpg' }]
    ];

    const output = orderBy(...input[0])(...input[1]);

    expect(output).toBe(-1);
  });

  test('dateCreation asc', () => {
    const input = [
      ['dateCreation', 'asc'],
      [{ dateCreation: '2020-01-01' }, { dateCreation: '2019-01-01' }]
    ];

    const output = orderBy(...input[0])(...input[1]);

    expect(output).toBe(1);
  });
});
