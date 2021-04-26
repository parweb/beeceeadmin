import { RecoilRoot } from 'recoil';
import { shallow } from 'enzyme';

import { CarouselLegend } from 'components/carousel';

describe('<CarouselLegend />', () => {
  test('Check if chunks is not empty', () => {
    const chunks = [
      { document: 'test.pdf' },
      { document: 'test2.pdf' },
      { document: 'test2.pdf' }
    ];
    const wrapper = shallow(
      <RecoilRoot>
        <CarouselLegend chunks={chunks} />
      </RecoilRoot>
    );

    expect(wrapper.find("[data-testid='CarouselLegend']")).toHaveLength(3);
  });

  test('Check if chunks is empty', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <CarouselLegend />
      </RecoilRoot>
    );

    expect(wrapper.find("[data-testid='CarouselLegend']")).toHaveLength(0);
  });

  test('Check the value of backgroundColor css  ', () => {
    const chunks = [
      { document: 'test.pdf' },
      { document: 'test2.pdf' },
      { document: 'test2.pdf' }
    ];

    const wrapper = shallow(
      <RecoilRoot>
        <CarouselLegend chunks={chunks} slide={0} />
      </RecoilRoot>
    );

    expect(
      wrapper.find("[data-testid='CarouselLegend']").get(0).props.style
    ).toHaveProperty('backgroundColor', '#0070d2');
    expect(
      wrapper.find("[data-testid='CarouselLegend']").get(1).props.style
    ).toHaveProperty('backgroundColor', '#fff');
    expect(
      wrapper.find("[data-testid='CarouselLegend']").get(2).props.style
    ).toHaveProperty('backgroundColor', '#fff');
  });

  test('Check onClick', () => {
    const chunks = [
      { document: 'test.pdf' },
      { document: 'test2.pdf' },
      { document: 'test2.pdf' }
    ];
    const handleGotoSlide = jest.fn();

    const wrapper = shallow(
      <RecoilRoot>
        <CarouselLegend chunks={chunks} slide={0} gotoSlide={handleGotoSlide} />
      </RecoilRoot>
    );

    wrapper.find("[data-testid='CarouselLegend']").at(1).simulate('click');

    expect(handleGotoSlide.mock.calls.length).toBe(1);
  });
});
