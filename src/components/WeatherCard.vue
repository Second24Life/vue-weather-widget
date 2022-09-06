<template>
  <div class="card">
    <div class="title">
      <span class="title__name">{{ city.name }},</span>
      <span class="title__country-code">{{ city.country }}</span>
    </div>

    <div class="content">
      <div class="content__main">
        <div class="main__img">
          <img :src="city.iconPath" :alt="city.skyDescr" />
        </div>
        <div class="main__temperature">{{ city.temp }}&deg;С</div>
      </div>
      <div class="content__description">
        Feels like {{ city.feelsLike }}&deg;C. {{ city.skyDescr }}.
        {{ city.windDescr }}
      </div>

      <div class="content__details">
        <div class="details__item wind">
          <span class="details__icon" :style="arrowWindDir">
            <app-icon-box viewBox="0 0 490 490"><icon-arrow /></app-icon-box>
          </span>
          <!-- <span class="details__name">Wind:</span> -->
          <span class="details__value">
            {{ city.speedWind }}m/s {{ city.windDirection }}
          </span>
        </div>
        <div class="details__item pressure">
          <span class="details__icon">
            <app-icon-box
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              ><icon-pressure
            /></app-icon-box>
          </span>
          <!-- <span class="details__name">Plessure:</span> -->
          <span class="details__value">{{ city.pressure }} hPa</span>
        </div>
        <div class="details__item humidity">
          <span class="details__name">Humidity:</span>
          <span class="details__value">{{ city.humidity }}%</span>
        </div>
        <div class="details__item dew-point">
          <span class="details__name">Dew point:</span>
          <span class="details__value">{{ city.dewPoint }}&deg;C</span>
        </div>
        <div class="details__item visibility">
          <span class="details__name">Visibility:</span>
          <span class="details__value">{{ city.visibility }} km</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import IconArrow from "@/assets/icons/IconArrow.vue";
import IconPressure from "@/assets/icons/IconPressure.vue";
import AppIconBox from "./AppIconBox.vue";
import { IWeatherMainShort } from "@/types";

export default defineComponent({
  components: { IconArrow, IconPressure, AppIconBox },

  props: {
    city: { type: Object as PropType<IWeatherMainShort>, required: true },
  },

  setup(props) {
    const arrowWindDir = `transform: rotate(${props.city.degWind + 180}deg);`;

    return {
      arrowWindDir,
    };
  },
});
</script>
