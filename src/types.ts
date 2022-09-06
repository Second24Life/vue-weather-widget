export interface IWeatherMainShort {
  id: number;
  name: string;
  country: string;
  iconPath: string;
  skyDescr: string;
  windDescr: string;
  windDirection: string;
  temp: number;
  feelsLike: number;
  speedWind: number;
  degWind: number;
  humidity: number;
  pressure: number;
  dewPoint: number;
  visibility: number;
  order: number;
  lat: number;
  lon: number;
  searchMethod: "Location" | "Coord";
}

export interface ILocation {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
  order: number;
  searchMethod: "Location" | "Coord";
  searchString?: string;
}

export interface ICity {
  city: string;
  countryCode?: string;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface IWeather {
  id: number;
  main: string; // Group of weather parameters
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IRain {
  "1h": number; // Precipitation volume for last hour
  "3h": number; // Precipitation volume for last 3 hours
}

export interface ISnow {
  all: number;
  "1h": number; // Snow volume for last hour
  "3h": number; // Snow volume for last 3 hours
}

export interface IClouds {
  all: number; // Cloudiness %
}

export interface ISys {
  id: number;
  type: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ICityWeather {
  id: number;
  name: string;
  country: string;
  cod: number;
  base: string;
  order: number;
  visibility: number;
  dt: number; // Data receiving time
  rain: IRain;
  snow: ISnow;
  weather: IWeather[];
  coord: ICoord;
  main: IMain;
  wind: IWind;
  clouds: IClouds;
  sys: ISys;
}
