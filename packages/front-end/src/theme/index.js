import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import components from './components';

const theme = extendTheme({
  breakpoints,
  colors,
  components,
  shadows: {  outline: 'transparent' }
});

export default theme;
