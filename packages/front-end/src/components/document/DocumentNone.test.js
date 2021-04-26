import renderer from 'react-test-renderer';
import DocumentNone from './DocumentNone';

describe('<DocumentNone />', () => {
  test('renders correctly', () => {
    const documentComponent = renderer.create(<DocumentNone />);
    const tree = documentComponent.toJSON();
    expect(tree.children[0]).toBe('Aucun document correspond à ce numéro!');
  });
});
