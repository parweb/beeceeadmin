import { shallow } from 'enzyme';
import { CarouselArrow } from 'components/carousel';

describe('<CarouselArrow />', () => {
  test('Check if carousel arrow button exists', () => {
    const wrapper = shallow(<CarouselArrow />);
    expect(wrapper.find('div > SLDSButton')).toHaveLength(1);
  });

  test('Check the value of iconName props left', () => {
    const wrapper = shallow(<CarouselArrow direction="left" />);
    const carouselArrowSelection = wrapper.find('div > SLDSButton');
    expect(carouselArrowSelection.props().iconName).toEqual('chevronleft');
  });

  test('Check the value of iconName props right ', () => {
    const wrapper = shallow(<CarouselArrow direction="right" />);
    const carouselArrowSelection = wrapper.find('div > SLDSButton');
    expect(carouselArrowSelection.props().iconName).toEqual('chevronright');
  });

  test('Check onclick ', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <CarouselArrow onClick={handleClick} direction="right" />
    );
    wrapper.find('div > SLDSButton').simulate('click');
    expect(handleClick.mock.calls.length).toBe(1);
  });
});
