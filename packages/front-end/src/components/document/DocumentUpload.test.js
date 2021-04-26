import { RecoilRoot } from 'recoil';
import { shallow } from 'enzyme';

import DocumentUpload from './DocumentUpload';

describe('<DocumentUpload />', () => {
  test('Check if upload button exists', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DocumentUpload />
      </RecoilRoot>
    );

    expect(wrapper.find('SLDSButton')).toHaveLength(1);
  });
});
