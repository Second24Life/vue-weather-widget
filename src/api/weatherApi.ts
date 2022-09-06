import axios from "axios";
import config from "@/config";
import { ICoord, ICity } from "@/types";

export default {
  getWeatherOfNameCity({ city, countryCode = "" }: ICity) {
    return axios.get(
      `${config.weatherServer}/data/2.5/weather?q=${city}${
        countryCode ? `,${countryCode}` : ""
      }&appid=${config.apiKey}&units=metric`
    );
  },

  getWeatherOfCoord({ lat, lon }: ICoord) {
    return axios.get(
      `${config.weatherServer}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=metric`
    );
  },
};
