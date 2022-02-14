<template>
  <div>
    <FormTask @whenSaveTask="saveTask" />
    <div class="lista">
      <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
      <CustomBox v-if="isEmptyList">
        Você não está muito produtivo hoje
      </CustomBox>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormTask from "../../components/tasks/FormTask.vue";
import TaskItem from "../../components/tasks/TaskItem.vue";
import ITask from "../../interfaces/ITask";
import CustomBox from "../../components/customs/CustomBox.vue";
import { useStoreX } from "../../store";
import { FINISH_TASK } from "../../store/mutations";

export default defineComponent({
  name: "TasksView",
  data() {
    return {

    };
  },
  components: {
    FormTask,
    TaskItem,
    CustomBox,
  },
  methods: {
    saveTask(task: ITask): void {
      this.store.commit(FINISH_TASK, task);
    },
  },
  computed: {
    isEmptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  setup() {
    const store = useStoreX();
    return {
      
      store,
      tasks: computed(() => store.state.tasks)
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
