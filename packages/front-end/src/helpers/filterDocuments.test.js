import { filterDocuments } from 'state';

describe('filters inclusif', () => {
  test('extension & tag', () => {
    const filters = [
      { type: 'extension', value: 'txt' },
      { type: 'tag', value: 'photoAO' }
    ];

    const documents = [
      { id: 1, preview: 'file.txt', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      { id: 1, photoAO: false, preview: 'file.txt' },
      { id: 2, photoAO: true, preview: 'file.csv' }
    ]);
  });

  test('extension & tag', () => {
    const filters = [
      { type: 'extension', value: 'txt' },
      { type: 'tag', value: 'photoAO' }
    ];

    const documents = [
      { id: 1, preview: 'file.csv', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      {
        id: 2,
        photoAO: true,
        preview: 'file.csv'
      }
    ]);
  });

  test('test', () => {
    const filters = [
      { type: 'documentName', value: [] },
      { type: 'tag', value: 'photoAO' }
    ];

    const documents = [
      {
        id: 1,
        preview: 'file.csv',
        photoAO: false,
        photo418: false,
        photoRapport: false
      },
      {
        id: 2,
        preview: 'file.csv',
        photoAO: true,
        photo418: false,
        photoRapport: false
      },
      {
        id: 3,
        preview: 'file.csv',
        photoAO: true,
        photo418: false,
        photoRapport: false
      }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      {
        id: 2,
        preview: 'file.csv',
        photoAO: true,
        photo418: false,
        photoRapport: false
      },
      {
        id: 3,
        preview: 'file.csv',
        photoAO: true,
        photo418: false,
        photoRapport: false
      }
    ]);
  });

  test('test', () => {
    const filters = [];

    const documents = [
      { id: 1, preview: 'file.csv', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ];

    const output = filterDocuments(documents, filters, false);

    expect(output).toStrictEqual([
      { id: 1, preview: 'file.csv', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ]);
  });

  test('test', () => {
    const filters = [{ type: 'photoName', value: [] }];

    const documents = [
      { id: 1, preview: 'file.csv', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      { id: 1, preview: 'file.csv', photoAO: false },
      { id: 2, preview: 'file.csv', photoAO: true }
    ]);
  });

  test('test', () => {
    const filters = [
      {
        type: 'photoName',
        value: [{ id: 'ASSU', label: 'Déclaration assuré' }]
      }
    ];

    const documents = [
      {
        id: 1,
        preview: 'file.csv',
        photoAO: false,
        typeDocument: 'PHO',
        codeQualification: 'ASSU'
      },
      {
        id: 2,
        preview: 'file.csv',
        photoAO: true,
        typeDocument: 'PHO',
        codeQualification: 'DIV'
      }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      {
        id: 1,
        preview: 'file.csv',
        photoAO: false,
        typeDocument: 'PHO',
        codeQualification: 'ASSU'
      }
    ]);
  });

  test('test', () => {
    const filters = [
      {
        type: 'photoName',
        value: [{ id: 'ASSU', label: 'Déclaration assuré' }]
      },
      {
        type: 'documentName',
        value: [{ id: 'PLOP', label: 'plop' }]
      }
    ];

    const documents = [
      {
        id: 1,
        preview: 'file.csv',
        photoAO: false,
        typeDocument: 'PHO',
        codeQualification: 'ASSU'
      },
      {
        id: 2,
        preview: 'file.csv',
        photoAO: true,
        typeDocument: 'PHO',
        codeQualification: 'DIV'
      },
      {
        id: 3,
        preview: 'file.csv',
        photoAO: true,
        typeDocument: 'other',
        codeQualification: 'PLOP'
      }
    ];

    const output = filterDocuments(documents, filters, true);

    expect(output).toStrictEqual([
      {
        id: 1,
        preview: 'file.csv',
        photoAO: false,
        typeDocument: 'PHO',
        codeQualification: 'ASSU'
      },
      {
        id: 3,
        preview: 'file.csv',
        photoAO: true,
        typeDocument: 'other',
        codeQualification: 'PLOP'
      }
    ]);
  });
});
