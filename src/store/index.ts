import { IWeatherMainShort } from "./../types";
import getDewPoint from "@/utils/getDewPoint";
import getWindDescr from "@/utils/getWindDescr";
import getWindDirection from "@/utils/getWindDirection";
import { createStore } from "vuex";
import weatherApi from "@/api/weatherApi";
import { ICityWeather, ILocation } from "@/types";

export interface State {
  page: "Home" | "Settings";
  cityList: IWeatherMainShort[];
  cityTotal: number;
  success: boolean;
  loading: boolean;
  error: {
    status: boolean;
    searchStatus: boolean;
    message: string;
  };
}

const createCityState = (
  data: ICityWeather,
  searchMethod: "Location" | "Coord"
): IWeatherMainShort => {
  const [weatherDescr] = data.weather;
  return {
    id: data.id,
    name: data.name,
    country: data.sys?.country,
    iconPath: `http://openweathermap.org/img/wn/${weatherDescr.icon}@2x.png`,
    skyDescr:
      weatherDescr.description[0].toUpperCase() +
      weatherDescr.description.slice(1),
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    speedWind: data.wind.speed,
    windDirection: getWindDirection(data.wind.deg),
    degWind: data.wind.deg,
    windDescr: getWindDescr(data.wind.speed),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    dewPoint: getDewPoint(data.main.temp, data.main.humidity),
    visibility: Math.round(data.visibility / 100) / 10,
    order: data.order,
    lat: data.coord.lat,
    lon: data.coord.lon,
    searchMethod,
  };
};

const setLocalStorage = (list: IWeatherMainShort[]) => {
  const setList: ILocation[] = list.map((item) => ({
    name: item.name,
    lat: item.lat,
    lon: item.lon,
    id: item.id,
    searchMethod: item.searchMethod,
    order: item.order,
    country: item.country,
  }));

  localStorage.setItem("cityList", JSON.stringify(setList));
};

const geo = navigator.geolocation;

export default createStore<State>({
  state: {
    page: "Home",
    cityList: [
      {
        id: 0,
        name: "",
        country: "",
        iconPath: "",
        skyDescr: "",
        windDescr: "",
        windDirection: "",
        temp: 0,
        feelsLike: 0,
        speedWind: 0,
        degWind: 0,
        humidity: 0,
        pressure: 0,
        dewPoint: 0,
        visibility: 0,
        order: 0,
        lat: 0,
        lon: 0,
        searchMethod: "Location",
      },
    ],
    cityTotal: 0,
    success: false,
    loading: false,
    error: {
      status: false,
      searchStatus: false,
      message: "",
    },
  },

  mutations: {
    changePage(state, page) {
      state.page = page;
    },

    setLoading(state) {
      state.loading = true;
    },

    removeLoading(state) {
      state.loading = false;
    },

    setError(state, error) {
      state.error.status = true;
      state.error.message = error.message;
    },

    setSearchError(state, error) {
      state.error.searchStatus = true;
      state.error.message = error.message;
    },

    removeError(state) {
      state.error.status = false;
      state.error.searchStatus = false;
      state.error.message = "";
    },

    setSuccess(state) {
      state.success = true;
    },

    removeSuccess(state) {
      state.success = false;
    },

    updateCityTotal(state) {
      state.cityTotal = state.cityList.length;
    },

    updateOrder(state) {
      state.cityList = state.cityList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setLocalStorage(state.cityList);
    },

    updateWeatherList(state, list) {
      state.cityList = list;
    },

    deleteCity(state, id: number) {
      state.cityList = state.cityList.filter((city) => city.id !== id);
    },

    addWeather(state, weather: IWeatherMainShort) {
      const thisCity = state.cityList.find((city) => city.id === weather.id);
      if (thisCity)
        throw Error(`This city has already been added (${thisCity.name}).`);
      state.cityList.push(weather);
      setLocalStorage(state.cityList);
    },

    resetCityList(state) {
      state.cityList = [];
      localStorage.removeItem("cityList");
    },
  },

  actions: {
    async loadWeather({ commit }, cityList: ILocation[]) {
      commit("setLoading");
      commit("removeError");
      commit("removeSuccess");

      try {
        const weatherList = await Promise.all(
          cityList.map(async (city: ILocation) => {
            let weatherResponse = null;
            const { lat, lon, name, country } = city;

            if (city.searchMethod === "Location")
              weatherResponse = await weatherApi.getWeatherOfNameCity({
                city: name,
                countryCode: country,
              });
            if (city.searchMethod === "Coord")
              weatherResponse = await weatherApi.getWeatherOfCoord({
                lat,
                lon,
              });
            if (weatherResponse) {
              const { data } = weatherResponse;
              data.order = city.order;
              return createCityState(data, city.searchMethod);
            }
            throw new Error("Couldn't find the city");
          })
        );

        weatherList.sort((a, b) => (a.order > b.order ? 1 : -1));

        commit("updateWeatherList", weatherList);
        commit("setSuccess");
      } catch (error) {
        commit("setError", error);
      } finally {
        commit("removeLoading");
      }
    },

    async loadCity({ commit, state }, cityName) {
      commit("setLoading");
      commit("removeError");
      commit("removeSuccess");

      try {
        const weatherResponse = await weatherApi.getWeatherOfNameCity({
          city: cityName,
        });

        const { data } = weatherResponse;
        state.cityTotal + 1;

        const weather = createCityState(data, "Location");

        commit("addWeather", weather);
        commit("updateCityTotal");
      } catch (error) {
        commit("setSearchError", error);
      } finally {
        commit("setSuccess");
        commit("removeLoading");
      }
    },

    async loadMyCity({ commit, state }) {
      const success: PositionCallback = async (pos) => {
        commit("setLoading");
        commit("removeError");
        commit("removeSuccess");

        try {
          const coords = {
            lat: Math.round(pos.coords.latitude * 100) / 100,
            lon: Math.round(pos.coords.longitude * 100) / 100,
          };

          const cityInfo = await weatherApi.getWeatherOfCoord(coords);
          const { data } = cityInfo;
          data.order = state.cityTotal + 1;

          const weather = createCityState(data, "Coord");

          commit("addWeather", weather);
          commit("updateCityTotal");
          commit("setSuccess");
        } catch (error) {
          commit("setError", error);
        } finally {
          commit("removeLoading");
        }
      };

      geo.getCurrentPosition(success);
    },

    changeOrderCities({ commit }, list) {
      commit("updateWeatherList", list);
      commit("updateOrder");
    },

    deleteCity({ commit }, id) {
      commit("deleteCity", id);
      commit("updateOrder");
      commit("updateCityTotal");
    },
  },
});
