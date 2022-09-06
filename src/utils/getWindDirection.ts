export default (windDeg: number): string => {
  if (
    (windDeg >= 0 && windDeg < 11.25) ||
    (windDeg >= 348.75 && windDeg <= 360)
  )
    return "N";
  if (windDeg < 33.75) return "NNE";
  if (windDeg < 56.25) return "NE";
  if (windDeg < 78.75) return "ENE";
  if (windDeg < 101.25) return "E";
  if (windDeg < 123.75) return "ESE";
  if (windDeg < 146.25) return "SE";
  if (windDeg < 168.75) return "SSE";
  if (windDeg < 191.25) return "S";
  if (windDeg < 213.75) return "SSW";
  if (windDeg < 236.25) return "SW";
  if (windDeg < 258.75) return "WSW";
  if (windDeg < 281.25) return "W";
  if (windDeg < 303.75) return "WNW";
  if (windDeg < 326.25) return "NW";
  if (windDeg < 348.75) return "NNW";
  return "";
};
