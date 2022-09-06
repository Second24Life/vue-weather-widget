<template>
  <div class="empty">
    <p class="empty__descr">City list is empty.</p>
    <button class="btn btn-empty" @click="addMyCity">Add current city</button>
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
