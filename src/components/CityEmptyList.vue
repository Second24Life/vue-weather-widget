<template>
  <div class="empty">
    <p class="empty__descr">Oh... Cities list is empty.</p>
    <button class="btn btn-empty" @click="addMyCity">Add my city</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useState from "@/hooks.ts/useState";

export default defineComponent({
  setup() {
    const { addMyCity } = useState();

    return { addMyCity };
  },
});
</script>
