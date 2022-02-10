<template>
  <CustomBox>
    <div class="columns">
      <div class="column is-7">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <CustomCron :timeInSeconds="task.timeInSeconds" />
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
});
</script>
