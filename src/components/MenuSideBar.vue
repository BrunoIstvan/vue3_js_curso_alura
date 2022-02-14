<template>
  <nav class="panel mt-5">
    <ul>
      <MenuItem
        v-for="(menu, index) in menus"
        :text="menu.text"
        :icon="menu.icon"
        :to="menu.to"
        :key="index"
      />
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuItem from "./MenuItem.vue";
import IMenuItem from "../interfaces/IMenuItem";

export default defineComponent({
  name: "MenuSideBar",
  components: {
    MenuItem,
  },
  data() {
    return {
      menus: [
        {
          text: "Tarefas",
          icon: "fas fa-tasks",
          to: "/",
        },
        {
          text: "Projetos",
          icon: "fas fa-project-diagram",
          to: "/projects",
        },
      ] as IMenuItem[],
    };
  },
});
</script>

<style scoped>
.panel li {
  margin: 8px 0;
}
</style>