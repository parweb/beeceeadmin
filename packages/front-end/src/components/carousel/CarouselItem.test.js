import { mount } from 'enzyme';

import { CarouselItem } from 'components/carousel';

describe('<CarouselItem />', () => {
  test('Check if <CarouselItem />   has a text', () => {
    const wrapper = mount(<CarouselItem>test</CarouselItem>);
    expect(wrapper.text()).toContain('test');
  });
});
