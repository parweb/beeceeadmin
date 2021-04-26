import { clamp } from 'helpers';

const applyContrast = (data, contrast) => {
  var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

  for (var i = 0; i < data.data.length; i += 4) {
    data.data[i] = clamp(factor * (data.data[i] - 128.0) + 128.0);
    data.data[i + 1] = clamp(factor * (data.data[i + 1] - 128.0) + 128.0);
    data.data[i + 2] = clamp(factor * (data.data[i + 2] - 128.0) + 128.0);
  }

  return data;
};

export default applyContrast;
