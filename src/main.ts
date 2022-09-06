import { createApp, defineCustomElement } from "vue";
import WeatherWidget from "./WeatherWidget.ce.vue";
import store from "./store";

// WeatherWidget.use(store);
const App = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", App);
