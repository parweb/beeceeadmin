import renderer from 'react-test-renderer';
import DocumentError from './DocumentError';

describe('<DocumentError />', () => {
  test('', () => {
    const component = renderer.create(<DocumentError />);
    const tree = component.toJSON();
    expect(tree.children[0]).toBe("Le numéro de mission n'existe pas");
  });
});
