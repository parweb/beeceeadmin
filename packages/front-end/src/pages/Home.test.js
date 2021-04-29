import Home from './Home';
import { shallow } from 'enzyme';
function mockFunction() {
  const original = require.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/another-route',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa'
    })
  };
}

jest.mock('react-router-dom', () => mockFunction());
describe('<Home />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Home />);
  });
  test('Check if button exists', () => {
    expect(wrapper.find('Link > SLDSButton')).toHaveLength(1);
  });
  test('Check if Link work', () => {
    expect(wrapper.find('Link').props().to).toEqual('/documents');
  });
});
