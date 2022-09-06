<template>
  <small v-if="error.searchStatus" class="search__error">
    Error: {{ error.message }}
  </small>

  <form class="search" @submit.prevent="submit">
    <label for="search" class="search__label">
      <input
        class="search__field"
        v-model="search"
        id="search"
        type="text"
        name="city"
        placeholder="Add city..."
        @focus="removeError"
      />
    </label>

    <button
      :disabled="!search.trim()"
      class="btn btn__search"
      type="submit"
      title="Add city"
    >
      <span v-if="!loading">
        <app-icon-box width="21px" height="21px" vieBox="0 0 21 21">
          <icon-add />
        </app-icon-box>
      </span>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IconAdd from "@/assets/icons/IconAdd.vue";
import AppIconBox from "./AppIconBox.vue";
import useState from "@/hooks.ts/useState";

export default defineComponent({
  components: { AppIconBox, IconAdd },

  setup() {
    const search = ref("");
    const { loading, error, loadCity, removeError } = useState();

    const submit = () => {
      loadCity(search.value);
    };

    return {
      error,
      search,
      loading,
      removeError,
      submit,
    };
  },
});
</script>
