import { mount } from 'enzyme';

import { CarouselPanel } from 'components/carousel';

describe('<CarouselPanel />', () => {
  test('Check if <CarouselPanel />   has a text', () => {
    const wrapper = mount(<CarouselPanel>test</CarouselPanel>);
    expect(wrapper.text()).toContain('test');
  });
});
