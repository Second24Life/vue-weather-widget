export default (temp: number, hum: number) => {
  const fTempHum = (17.27 * temp) / (237.7 + temp) + Math.log(hum / 100);
  return Math.round((237.7 * fTempHum) / (17.27 - fTempHum));
};
