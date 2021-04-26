const filterBySigned = filter => document =>
  ({
    true: ({ signable, signed }) => signable === true && !signed
  }[filter](document));

export default filterBySigned;
