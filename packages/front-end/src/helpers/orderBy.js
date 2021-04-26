const orderBy = (by, direction, transform = null) => (_a, _b) => {
  let a = _a[by];
  let b = _b[by];

  if (transform !== null) {
    a = transform(a, _a);
    b = transform(b, _b);
  }

  if (direction === 'desc') return b > a ? 1 : -1;
  if (direction === 'asc') return b > a ? -1 : 1;
};

export default orderBy;
