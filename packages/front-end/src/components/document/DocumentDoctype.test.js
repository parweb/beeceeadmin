import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import DocumentDoctype from './DocumentDoctype';

describe('<DocumentDoctype />', () => {
  test('render correctly DocumentDoctype component', () => {
    const documentComponent = renderer.create(<DocumentDoctype />);
    const tree = documentComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders pdf svg', () => {
    const wrapper = mount(<DocumentDoctype />);

    expect(wrapper.find('svg.slds-button__icon')).toHaveLength(1);
  });

  test('check the value of props', () => {
    const wrapper = mount(
      <DocumentDoctype file="test.call" extention="call" size={2} />
    );

    expect(
      wrapper.find("[data-testid='DocumentDoctype']").props().iconName
    ).toEqual('call');
    expect(
      wrapper.find("[data-testid='DocumentDoctype']").props().iconCategory
    ).toEqual('action');
  });

  test('Check the value of transfrom css  ', () => {
    const wrapper = mount(
      <DocumentDoctype file="test.call" extention="call" size={2} />
    );

    expect(
      wrapper.find("[data-testid='DocumentDoctype']").get(0).props.style
    ).toHaveProperty('transform', 'scale(2)');
  });
});
