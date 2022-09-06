<template>
  <div class="settings">
    <h1 class="title">Settings</h1>

    <button @click="changePage('Home')" class="btn btn-close">
      <app-icon-box x="0" y="0" width="25" height="25" viewBox="0 0 30 30">
        <icon-close />
      </app-icon-box>
    </button>

    <draggable
      v-if="cityList.length"
      v-model="cityList"
      item-key="id"
      tag="ul"
      class="settings__list"
      handle=".handle"
    >
      <template #item="{ element }">
        <li class="settings__item">
          <city-item :city="element" />
        </li>
      </template>
    </draggable>

    <div v-if="loading && !cityList.length" class="loader-wrapper">
      <app-loader />
    </div>

    <city-empty-list v-if="!loading && !cityList.length" />

    <search-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import AppLoader from "@/components/AppLoader.vue";
import AppIconBox from "@/components/AppIconBox.vue";
import SearchInput from "@/components/SearchInput.vue";
// import SearchResultsList from '@/components/SearchResultsList.vue';
import CityEmptyList from "@/components/CityEmptyList.vue";
import CityItem from "@/components/CityItem.vue";
import useState from "@/hooks.ts/useState";
import IconClose from "@/assets/icons/IconClose.vue";

export default defineComponent({
  components: {
    draggable,
    AppLoader,
    AppIconBox,
    SearchInput,
    CityEmptyList,
    CityItem,
    IconClose,
  },

  setup() {
    const { loading, cityList, changePage } = useState();

    return {
      loading,
      cityList,
      changePage,
    };
  },
});
</script>
