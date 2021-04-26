import { RecoilRoot } from 'recoil';
import { mount, shallow } from 'enzyme';

import { CarouselFrame } from 'components/carousel';

describe('<CarouselFrame />', () => {
  test('Check if <CarouselFrame />   has a text', () => {
    const wrapper = mount(
      <RecoilRoot>
        <CarouselFrame>test</CarouselFrame>
      </RecoilRoot>
    );
    expect(wrapper.text()).toContain('test');
  });

  test('Check the value of props ', () => {
    const chunks = [
      { document: 'test.pdf' },
      { document: 'test2.pdf' },
      { document: 'test2.pdf' }
    ];

    const wrapper = shallow(
      <RecoilRoot>
        <CarouselFrame chunks={chunks} slide={2} />
      </RecoilRoot>
    );

    expect(wrapper.find('CarouselLegend').first().props().chunks).toHaveLength(
      3
    );

    expect(wrapper.find('CarouselLegend').first().props().slide).toEqual(2);
  });
});
