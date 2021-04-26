const clamp = (value, min = 0, max = 255) =>
  Math.min(Math.max(value, min), max);

export default clamp;
