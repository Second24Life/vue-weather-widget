<template>
  <WeatherWidget />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "./views/WeatherWidget.vue";

export default defineComponent({
  name: "App",
  components: {
    WeatherWidget,
  },
});
</script>

<style lang="scss">
#app {
  margin: 50px auto;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}
</style>
