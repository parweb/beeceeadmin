import { RecoilRoot, useRecoilValue } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';

import { $modal } from 'state';

describe('<Modal />', () => {
  it('should initialise $modal with an object', () => {
    const { result } = renderHook(() => useRecoilValue($modal), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual({
      content: <div />,
      contentStyle: {
        height: '90vh'
      },
      directional: false,
      footer: null,
      heading: '',
      isOpen: false,
      onClose: null,
      size: 'medium'
    });
  });
});
