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
        <CustomTimer @whenFinishedTimer="finishTask" :disableButtons="disableButtons" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CustomTimer from "../customs/CustomTimer.vue";
import { useStoreX } from "../../store";
import SelectProject from "../projects/SelectProject.vue";
import { TypeNotification } from "../../interfaces/INotification";
import { notifyMixin } from '../../mixins/notify'

import useNotifier from '../../hooks/notifier';

export default defineComponent({
  name: "FormTask",
  emits: ["whenSaveTask"],
  data() {
    return {
      description: "",
    };
  },
  components: {
    CustomTimer,
    SelectProject,
  },
  methods: {
    finishTask(timeInSeconds: number): void {

      this.$emit("whenSaveTask", {
        timeInSeconds,
        description: this.description,
        project: this.projects.find((p) => p.id == this.projectId),
      });
      this.description = "";
      this.notify(TypeNotification.SUCCESS, 'Muito bem', 'Task encerrada com sucesso');
      
    },
    
  },
  mixins: [
    notifyMixin
  ],
  setup() {
    const store = useStoreX();
    const projectId = ref("");

    const { notify } = useNotifier();

    return {
      projects: computed(() => store.state.projects),
      projectId,
      store,
      notify
    };
  },
  computed: {
    disableButtons() : boolean {
      return this.description == undefined || this.description == '' || 
              this.projectId == undefined || this.projectId == '';
    }
  }
});
</script>

<style>
.form-class {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>