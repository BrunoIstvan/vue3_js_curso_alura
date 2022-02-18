<template>
  <CustomBox>
    <div class="columns" @click="taskSelected">
      <div class="column is-5">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-5">
        {{ task.project.name }}
      </div>
      <div class="column">
        <CustomCron :timeInSeconds="task.timeInSeconds" display="normal" />
      </div>
    </div>
  </CustomBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CustomCron from "../customs/CustomCron.vue";
import ITask from "../../interfaces/ITask";
import CustomBox from "../customs/CustomBox.vue";

export default defineComponent({
  name: "TaskItem",
  emits: ['whenTaskIsSelected'],
  components: {
    CustomCron,
    CustomBox,
  },
  methods: {
    taskSelected(): void {
      this.$emit('whenTaskIsSelected', this.task);
    }
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
});
</script>
