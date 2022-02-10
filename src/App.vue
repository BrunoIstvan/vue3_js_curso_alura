<template>
  <main class="columns is-gaplessis-multiline" :class="{ 'dark-mode' : darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @whenChangeTheme="changeTheme" />
    </div>

    <div class="column is-three-quarter content">
      <FormTask @whenSaveTask="saveTask" />
      <div class="lista">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
        <CustomBox v-if="isEmptyList" > Você não está muito produtivo hoje </CustomBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import FormTask from "./components/tasks/FormTask.vue";
import TaskItem from "./components/tasks/TaskItem.vue";
import ITask from "./interfaces/ITask";
import CustomBox from "./components/customs/CustomBox.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      tasks: [] as ITask[],
      darkModeActive: false,
    };
  },
  components: {
    SideBar,
    FormTask,
    TaskItem,
    CustomBox,
  },
  methods: {
    saveTask(task: ITask): void {
      this.tasks.push(task);
    },
    changeTheme(darkModeActive: boolean) : void {
      this.darkModeActive = darkModeActive;
    }
  },
  computed: {
    isEmptyList() : boolean {
      return this.tasks.length === 0;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary)
}
</style>
