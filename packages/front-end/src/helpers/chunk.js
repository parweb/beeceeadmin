const chunk = (list, chuckSize) => {
  if (chuckSize === 0) return list;

  const data = [...list];
  return new Array(Math.ceil(data.length / chuckSize))
    .fill()
    .map(_ => data.splice(0, chuckSize));
};

export default chunk;
