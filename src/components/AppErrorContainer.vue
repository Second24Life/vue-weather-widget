<template>
  <div class="error-block">
    <p class="error-block__title">
      <span>Error:</span>
      <span class="error-block__message">{{ error.message }}</span>
    </p>

    <button class="btn error-block__btn" @click="repairApp">Try again</button>

    <button
      class="btn error-block__btn error-block__btn_warn"
      @click="resetAll"
    >
      Reset widget
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useState from "@/hooks.ts/useState";

export default defineComponent({
  setup() {
    const store = useState();
    const { error, repairApp, resetAll } = store;

    return {
      error,
      repairApp,
      resetAll,
    };
  },
});
</script>
