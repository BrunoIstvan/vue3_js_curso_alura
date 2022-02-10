<template>
  <div class="box form-class">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>
      <div class="column">
        <CustomTimer @whenFinishedTimer="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTimer from '../customs/CustomTimer.vue';

export default defineComponent({
  name: "FormTask",
  emits: [
    'whenSaveTask'
  ],
  data() {
    return { description: "" };
  },
  components: {
    CustomTimer,
  },
  methods: {
    finishTask(timeInSeconds: number): void {
      
      this.$emit('whenSaveTask', {
        timeInSeconds,
        description: this.description
      })

      this.description = ''
    },
    
  },
});
</script>

<style>
.form-class {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>