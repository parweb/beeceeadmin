import { forwardRef } from 'react';
import { Button as ButtonUi } from '@chakra-ui/react';

const Button = forwardRef((props, ref) => {
  return <ButtonUi ref={ref} {...props} />;
});

export default Button;
