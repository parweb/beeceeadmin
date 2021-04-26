const filterByType = filter => ({ typeDocument }) =>
  ({
    all: () => true,
    photos: typeDocument => typeDocument === 'PHO',
    others: typeDocument => typeDocument !== 'PHO'
  }[filter](typeDocument));

export default filterByType;
