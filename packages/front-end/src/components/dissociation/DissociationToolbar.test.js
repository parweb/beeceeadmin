import { shallow } from 'enzyme';
import { RecoilRoot } from 'recoil';

import { DissociationToolbar } from 'components/dissociation';

describe('<DissociationToolbar />', () => {
  test('Check onclick ', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <RecoilRoot>
        <DissociationToolbar onClick={handleClick} />
      </RecoilRoot>
    );
    wrapper.find('DissociationToolbar').simulate('click');
    expect(handleClick.mock.calls.length).toBe(1);
  });
});
