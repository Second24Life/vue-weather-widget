export default (speed: number): string => {
  if (speed < 0.4) return "Calm";
  if (speed < 1.6) return "Light air";
  if (speed < 3.4) return "Light breeze";
  if (speed < 5.5) return "Gentle breeze";
  if (speed < 8.0) return "Moderate breeze";
  if (speed < 10.8) return "Fresh breeze";
  if (speed < 13.9) return "Strong breeze";
  if (speed < 17.2) return "Near gale";
  if (speed < 20.8) return "Gale";
  if (speed < 24.5) return "Strong gale";
  if (speed < 28.5) return "Storm";
  if (speed < 32.7) return "Violent storm";
  return "Hurricane force";
};
