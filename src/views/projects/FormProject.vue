<template>
  <section>
    <form @submit.prevent="saveProject">
      <div class="field">
        <label for="projectName" class="label display">Nome do projeto</label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>

      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TypeNotification } from "../../interfaces/INotification";
import { useStoreX } from "../../store";
import { UPDATE_PROJECT, ADD_PROJECT } from '../../store/mutations';
import { notifyMixin } from '../../mixins/notify'

export default defineComponent({
  name: "FormProject",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find((p) => p.id == this.id);
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  mixins: [
    notifyMixin
  ],
  methods: {
    saveProject() {
      if (this.id) {
        this.store.commit(UPDATE_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        this.store.commit(ADD_PROJECT, this.projectName);
      }
      this.projectName = "";
      
      this.notify(TypeNotification.SUCCESS, 'Parabéns', 'Projeto salvo com sucesso');
      
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStoreX();
    return {
      store,
    };
  },
});
</script>

<style scoped>

.display {
  color: var(--text-primary);
}

</style>

