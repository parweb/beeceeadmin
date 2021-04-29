import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';

const RadioCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        _checked={{
          bg: 'blue.primary',
          color: 'white.primary'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="50%"
        boxShadow="md"
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const ButtonGroup = ({ name, options, value, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: value,
    value,
    onChange
  });

  const group = getRootProps();

  return (
    <HStack id="input-pagination" {...group} justifyContent="center">
      {options.map((value, index) => (
        <RadioCard
          id={`pagination${index}`}
          key={value}
          {...getRadioProps({ value })}
        >
          {value}
        </RadioCard>
      ))}
    </HStack>
  );
};

export default ButtonGroup;
