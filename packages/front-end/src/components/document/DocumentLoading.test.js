import renderer from 'react-test-renderer';
import DocumentLoading from './DocumentLoading';
import { shallow } from 'enzyme';

describe('<DocumentLoading />', () => {
  test('render correctly DocumentLoading component', () => {
    const component = renderer.create(<DocumentLoading />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Check if spinner exists', () => {
    const wrapper = shallow(<DocumentLoading />);
    expect(wrapper.find('SLDSSpinner')).toHaveLength(1);
  });
});
