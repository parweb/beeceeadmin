import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Settings } from '@salesforce/design-system-react';

import vitals from './vitals';
import App from './App';

Settings.setAppElement('#root');
const root = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);

vitals();
