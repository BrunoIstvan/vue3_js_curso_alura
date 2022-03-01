<template>
  <div class="box form-class">
    <div class="columns">
      <div
        class="column is-6"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          id="description"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>

      <div class="column is-2">
        <SelectProject v-model:projectId="projectId"></SelectProject>
      </div>

      <div class="column">
        <CustomTimer
          @whenFinishedTimer="finishTask"
          :disableButtons="disableButtons"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CustomTimer from "../../components/customs/CustomTimer.vue";
import { useStoreX } from "../../../store";
import SelectProject from "../../components/projects/SelectProject.vue";

export default defineComponent({
  name: "FormTask",
  emits: ["whenSaveTask"],
  components: {
    CustomTimer,
    SelectProject,
  },
  computed: {
    disableButtons(): boolean {
      return (
        this.description == undefined ||
        this.description == "" ||
        this.projectId == undefined ||
        this.projectId == ""
      );
    },
  },
  setup(props, { emit }) {
    const store = useStoreX();
    const projectId = ref("");
    const description = ref("");

    const projects = computed(() => store.state.project.projects);

    const finishTask = (timeInSeconds: number): void => {
      emit("whenSaveTask", {
        timeInSeconds,
        description: description.value,
        project: projects.value.find((p) => p.id == projectId.value),
      });
      description.value = "";
    };

    return {
      projects,
      projectId,
      description,
      finishTask,
    };
  },
});
</script>

<style>
.form-class {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>