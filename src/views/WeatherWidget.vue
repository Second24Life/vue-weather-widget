<template>
  <div class="weather-widget__wrapper">
    <weather-index v-if="page === 'Home'" />
    <weather-settings v-if="page === 'Settings'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ILocation } from "@/types";
import WeatherIndex from "./WeatherIndex.vue";
import WeatherSettings from "./WeatherSettings.vue";
import useState from "@/hooks.ts/useState";

export default defineComponent({
  components: { WeatherIndex, WeatherSettings },

  setup() {
    const { page, loadApp } = useState();

    const storageSitiesList: ILocation[] | null = JSON.parse(
      localStorage.getItem("cityList") || "null"
    );

    loadApp(storageSitiesList);

    return { page };
  },
});
</script>

<style lang="scss">
@import "@/assets/style/style.scss";
</style>
