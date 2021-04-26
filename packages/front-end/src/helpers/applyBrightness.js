const applyBrightness = (data, brightness) => {
  for (var i = 0; i < data.data.length; i += 4) {
    data.data[i] += 255 * (brightness / 100);
    data.data[i + 1] += 255 * (brightness / 100);
    data.data[i + 2] += 255 * (brightness / 100);
  }
  return data;
};

export default applyBrightness;
