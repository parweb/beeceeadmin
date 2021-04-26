import { RecoilRoot } from 'recoil';
import { mount } from 'enzyme';

import DocumentThumbnail from './DocumentThumbnail';

describe('<DocumentThumbnail />', () => {
  test('Check if <img /> exists', () => {
    const wrapper = mount(
      <RecoilRoot>
        <DocumentThumbnail />
      </RecoilRoot>
    );

    expect(wrapper.find('DocumentThumbnail > img')).toHaveLength(1);
  });

  test('Check value of alt & src exists', () => {
    const wrapper = mount(
      <RecoilRoot>
        <DocumentThumbnail nomFichier="testFile" preview="test" />
      </RecoilRoot>
    );

    expect(wrapper.find('DocumentThumbnail > img').props().alt).toEqual(
      'testFile'
    );
    expect(wrapper.find('DocumentThumbnail > img').props().src).toEqual(
      'test&height=100'
    );
  });
});
