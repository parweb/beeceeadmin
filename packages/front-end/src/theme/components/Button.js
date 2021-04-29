const Button = {
  variants: {
    solid: {
      fontSize: '13px',
      fontWeight: '400',
      bg: 'yellow.primary',
      color: 'black.primary',
      textTransform: 'uppercase',
      _hover: {
        bg: 'yellow.secondary'
      }
    }
  },
  sizes: {
    sm: {
      borderRadius: '15px',
      padding: '6px 12px'
    },
    md: {
      borderRadius: '30px',
      padding: '12px 25px'
    }
  },
  defaultProps: {
    size: 'md'
  }
};

export default Button;
