<template>
  <section class="project">
    <h1 class="display">Projetos</h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsView",
  components: {},
  methods: {},
});
</script>

<style scoped>
.project {
  padding: 1.25rem;
}

.display {
  color: var(--text-primary);
}

</style>