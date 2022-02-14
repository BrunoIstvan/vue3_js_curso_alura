<template>
  <div class="select">
    <select :value="projectId" @change="$emit('update:projectId', $event.target.value)">
      <option value="">Selecione o projeto</option>
      <option :value="project.id" v-for="project in projects" :key="project.id">
        {{ project.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStoreX } from "../../store";

export default defineComponent({
  name: "SelectProject",
  props: {
      projectId: { 
          type: String
      }
  },
  setup() {
    const store = useStoreX();
    return {
      projects: computed(() => store.state.projects),
    };
  },
});
</script>