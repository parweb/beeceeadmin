import { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';

const ErrorText = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  border: 0px;
  border-bottom: 1px solid #888;
  padding-left: 0px;
  text-indent: 0px;
  width: 100%;
  margin-bottom: ${({ variant, errorText }) =>
    variant === 'no-margin' || errorText ? '0px' : '20px'};
  color: #888;
  line-height: 30px;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  &::-webkit-search-decoration:hover,
  &::-webkit-search-cancel-button:hover {
    cursor: pointer;
  }
`;

const PasswordInput = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <InputGroup size="md">
        <StyledInput ref={ref} {...props} type={show ? 'text' : 'password'} />

        <InputRightElement>
          <IconButton
            variant="link"
            size="lg"
            onClick={() => setShow(show => !show)}
            icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          />
        </InputRightElement>
      </InputGroup>

      {props.errorText && <ErrorText>{props.errorText}</ErrorText>}
    </>
  );
});

const Input = forwardRef((props, ref) => {
  if (props.type === 'password') return <PasswordInput ref={ref} {...props} />;

  return (
    <>
      <StyledInput ref={ref} {...props} />
      {props.errorText && <ErrorText>{props.errorText}</ErrorText>}
    </>
  );
});

export default Input;
