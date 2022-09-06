<template>
  <button class="btn btn-handle handle">
    <icon-box
      x="0"
      y="0"
      width="122.879px"
      height="103.609px"
      viewBox="0 0 122.879 103.609"
    >
      <icon-burger />
    </icon-box>
  </button>

  <p class="settings__item-name">{{ city.name }}, {{ city.country }}</p>

  <button class="btn btn-remove" @click.prevent="remove">
    <icon-box
      x="0"
      y="0"
      width="482.428px"
      height="482.429px"
      viewBox="0 0 482.428 482.429"
    >
      <icon-remove />
    </icon-box>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IWeatherMainShort } from "@/types";
import useState from "@/hooks.ts/useState";
import IconRemove from "@/assets/icons/IconRemove.vue";
import IconBurger from "@/assets/icons/IconBurger.vue";
import IconBox from "./AppIconBox.vue";

export default defineComponent({
  components: { IconBox, IconRemove, IconBurger },

  props: {
    city: { type: Object as PropType<IWeatherMainShort>, required: true },
  },

  setup(props) {
    const { removeCity } = useState();
    const remove = () => {
      removeCity(props.city.id);
    };

    return {
      remove,
    };
  },
});
</script>
