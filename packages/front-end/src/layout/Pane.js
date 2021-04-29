import { Box } from '@chakra-ui/react';

const Pane = ({ children, title, button = null }) => {
  return (
    <Box border="1px solid #dddbda" borderRadius={4} mt={4}>
      <Box
        bg="blue.primary"
        color="white.primary"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <strong>{title}</strong> {button}
      </Box>

      <Box bg="blue.secondary" p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default Pane;
