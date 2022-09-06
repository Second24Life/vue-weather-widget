<template>
  <app-loader v-if="loading" />

  <button class="btn btn-setting" @click="changePage('Settings')">
    <app-icon-box x="0px" y="0px" viewBox="0 0 490 490">
      <icon-gear />
    </app-icon-box>
  </button>

  <ul v-if="cityList.length && success" class="city-list">
    <li class="city-list__item" v-for="city in cityList" :key="city.id">
      <weather-card :city="city" />
    </li>
  </ul>

  <app-error-container v-if="error.status" />

  <city-empty-list v-if="!cityList.length && !loading && !error.status" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLoader from "@/components/AppLoader.vue";
import AppErrorContainer from "@/components/AppErrorContainer.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import CityEmptyList from "@/components/CityEmptyList.vue";
import AppIconBox from "@/components/AppIconBox.vue";
import IconGear from "@/assets/icons/IconGear.vue";
import useState from "@/hooks.ts/useState";

export default defineComponent({
  components: {
    AppLoader,
    AppErrorContainer,
    WeatherCard,
    CityEmptyList,
    AppIconBox,
    IconGear,
  },

  setup() {
    const { cityList, loading, success, error, changePage } = useState();

    return {
      cityList,
      loading,
      error,
      success,
      changePage,
    };
  },
});
</script>
