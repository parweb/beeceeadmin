import { getIcon } from 'helpers';

describe('getIcon', () => {
  test('doctype pdf', () => {
    const input = 'pdf';

    const output = getIcon(input);

    expect(output).toStrictEqual({
      extension: 'pdf',
      iconCategory: 'doctype',
      iconName: 'pdf'
    });
  });

  test('doctype excel', () => {
    const input = 'xls';

    const output = getIcon(input);

    expect(output).toStrictEqual({
      extension: 'xls',
      iconCategory: 'doctype',
      iconName: 'excel'
    });
  });

  test('doctype attachment', () => {
    const input = 'attachment';

    const output = getIcon(input);

    expect(output).toStrictEqual({
      extension: 'attachment',
      iconCategory: 'doctype',
      iconName: 'attachment'
    });
  });

  test('unknown', () => {
    const input = 'dontexist';

    const output = getIcon(input);

    expect(output).toStrictEqual({
      extension: 'dontexist',
      iconCategory: 'doctype',
      iconName: 'unknown'
    });
  });
});
