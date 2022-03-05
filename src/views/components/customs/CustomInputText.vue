<template>
  <div class="field">
    <p class="control has-icons-left">
      <input
        class="input"
        type="text"
        placeholder="Digite para filtrar"
        v-model="filter"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  name: "CustomInputText",
  emits: ["filterChanged"],
  setup(props, { emit }) {
    const filter = ref("");

    watchEffect(() => {
      emit("filterChanged", filter.value);
    });

    return {
      filter,
    };
  },
});
</script>