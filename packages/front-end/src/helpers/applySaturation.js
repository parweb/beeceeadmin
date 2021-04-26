const applySaturation = (data, saturation) => {
  var sv = saturation; // saturation value. 0 = grayscale, 1 = original

  var luR = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
  var luG = 0.6094;
  var luB = 0.082;

  var az = (1 - sv) * luR + sv;
  var bz = (1 - sv) * luG;
  var cz = (1 - sv) * luB;
  var dz = (1 - sv) * luR;
  var ez = (1 - sv) * luG + sv;
  var fz = (1 - sv) * luB;
  var gz = (1 - sv) * luR;
  var hz = (1 - sv) * luG;
  var iz = (1 - sv) * luB + sv;

  for (var i = 0; i < data.data.length; i += 4) {
    var red = data.data[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
    var green = data.data[i + 1];
    var blue = data.data[i + 2];

    var saturatedRed = az * red + bz * green + cz * blue;
    var saturatedGreen = dz * red + ez * green + fz * blue;
    var saturateddBlue = gz * red + hz * green + iz * blue;

    data.data[i] = saturatedRed;
    data.data[i + 1] = saturatedGreen;
    data.data[i + 2] = saturateddBlue;
  }

  return data;
};

export default applySaturation;
