import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Input, Button } from '@salesforce/design-system-react';

import Login from './Login';

describe('<Login />', () => {
  test('display a correct form', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(wrapper.find(Input)).toHaveLength(2);
    expect(wrapper.find(Input).at(0).props().name).toBe('username');
    expect(wrapper.find(Input).at(1).props().name).toBe('password');
    expect(wrapper.find(Input).at(1).props().type).toBe('password');
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).at(0).props().type).toBe('submit');
  });

  test('username is required', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await act(async () => {
      wrapper.find(Button).simulate('click');

      // console.log(wrapper.find(Input).at(0).props());
      // expect(wrapper.find(Input).at(0)).toBe(true);
    });
  });
});
