import store from "@/store";
import { IWeatherMainShort, ILocation } from "@/types";
import { computed } from "vue";

export default () => {
  const loading = computed(() => store.state.loading);
  const success = computed(() => store.state.success);
  const error = computed(() => store.state.error);
  const page = computed(() => store.state.page);
  const addMyCity = () => {
    store.dispatch("loadMyCity");
  };

  const changePage = (value: "Home" | "Settings") => {
    store.commit("changePage", value);
  };

  const cityList = computed<IWeatherMainShort[]>({
    get() {
      return store.state.cityList;
    },
    set(value) {
      store.dispatch("changeOrderCities", value);
    },
  });

  const loadApp = (loadCitylist: ILocation[] | IWeatherMainShort[] | null) => {
    if (loadCitylist && loadCitylist.length) {
      store.dispatch("loadWeather", loadCitylist);
    } else store.dispatch("loadMyCity");
  };

  const repairApp = () => {
    loadApp(cityList.value);
  };

  const removeCity = (id: number) => {
    store.dispatch("deleteCity", id);
  };

  const resetAll = () => {
    store.commit("resetcityList");
    store.dispatch("loadMyCity");
  };

  const removeError = () => {
    store.commit("removeError");
  };

  const loadCity = (value: string) => {
    store.dispatch("loadCity", value.trim());
  };

  return {
    cityList,
    loading,
    error,
    success,
    page,
    changePage,
    removeCity,
    addMyCity,
    repairApp,
    resetAll,
    removeError,
    loadCity,
    loadApp,
  };
};
