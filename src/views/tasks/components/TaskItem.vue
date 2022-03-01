<template>
  <CustomBox>
    <div class="columns">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-4">
        {{ task.project.name }}
      </div>
      <div class="column is-2">
        <CustomCron :timeInSeconds="task.timeInSeconds" display="normal" />
      </div>
      <div class="column">
        <span
          class="icon is-small has-text-success"
          @click="taskSelected"
          style="cursor: pointer"
        >
          <i class="fas fa-edit fa-fw"></i>
        </span>
      </div>
      <div class="column">
        <span
          class="icon is-small has-text-danger"
          @click="deleteTask"
          style="cursor: pointer"
        >
          <i class="fas fa-trash fa-fw"></i>
        </span>
      </div>
    </div>
  </CustomBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CustomCron from "../../components/customs/CustomCron.vue";
import ITask from "../../../interfaces/ITask";
import CustomBox from "../../components/customs/CustomBox.vue";

export default defineComponent({
  name: "TaskItem",
  emits: ["whenTaskIsSelected", "whenDeleteTaskIsClicked"],
  components: {
    CustomCron,
    CustomBox,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const taskSelected = (): void => {
      emit("whenTaskIsSelected", props.task);
    };

    const deleteTask = (): void => {
      emit("whenDeleteTaskIsClicked", props.task);
    };

    return { taskSelected, deleteTask };
  },
});
</script>
