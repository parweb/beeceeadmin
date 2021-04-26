const filterByTag = filter => ({
  photoAO = false,
  photo418 = false,
  photoRapport = false
}) => !!{ photoAO, photo418, photoRapport }[filter];

export default filterByTag;
