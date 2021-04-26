import { filterByTag } from 'helpers';

describe('filterByTag', () => {
  test('photoAO true', () => {
    const input = ['photoAO', { photoAO: true }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeTruthy();
  });

  test('photoAO false', () => {
    const input = ['photoAO', { photoAO: false }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeFalsy();
  });

  test('photo418 true', () => {
    const input = ['photo418', { photo418: true }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeTruthy();
  });

  test('photo418 false', () => {
    const input = ['photo418', { photo418: false }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeFalsy();
  });

  test('photoRapport true', () => {
    const input = ['photoRapport', { photoRapport: true }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeTruthy();
  });

  test('photoRapport false', () => {
    const input = ['photoRapport', { photoRapport: false }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeFalsy();
  });

  test('other false', () => {
    const input = ['photoRapport', { other: false }];

    const output = filterByTag(input[0])(input[1]);

    expect(output).toBeFalsy();
  });
});
