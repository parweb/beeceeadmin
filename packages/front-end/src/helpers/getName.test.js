import { getName } from 'helpers';

describe('getName', () => {
  test('PHO ARD:3/4 Arrière Droit', () => {
    const input = ['PHO', 'ARD'];
    const output = getName(...input);

    expect(output).toStrictEqual({ id: 'ARD', label: '3/4 Arrière Droit' });
  });

  test('PHO unknown', () => {
    const input = ['PHO', 'unknown'];
    const output = getName(...input);

    expect(output).toStrictEqual({ id: 'AUTR', label: 'Autres' });
  });

  test('DOC ANH:Analyse d’huile', () => {
    const input = ['DOC', 'ANH'];
    const output = getName(...input);

    expect(output).toStrictEqual({ id: 'ANH', label: 'Analyse d’huile' });
  });

  test('DOC unknown', () => {
    const input = ['DOC', 'unknown'];
    const output = getName(...input);

    expect(output).toStrictEqual({ id: 'DIV', label: 'Divers' });
  });
});
