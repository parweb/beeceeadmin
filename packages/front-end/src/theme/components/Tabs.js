const Tabs = {
  parts: ['tabs', 'tab', 'tablist'],
  defaultProps: {
    colorScheme: 'black'
  },
  sizes: {
    md: {
      tablist: {
        bg: 'yellow.secondary',
        margin: '10px'
      },
      tab: {
        color: 'black.primary',
        borderRadius: '0px',
        transition: '1s',
        p: 4,

        _selected: {
          borderRadius: '0px',
          bg: 'yellow.primary',
          color: 'black.primary',
          transform: 'scale(1.1)'
        }
      }
    }
  }
};

export default Tabs;
