<template>
  <section>
    <CustomButton
      text="Novo Projeto"
      disable="false"
      icon="fas fa-plus"
      @whenClicked="goToNewProject"
    />

    <table class="table is-fullwidth display-table">
      <thead>
        <tr>
          <th class="display-table">Id</th>
          <th class="display-table">Nome</th>
          <th class="display-table">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="deleteProject(project.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStoreX } from "../../store";
import CustomButton from "../components/customs/CustomButton.vue";

import useNotifier from "../../hooks/notifier";
import { TypeNotification } from "../../interfaces/INotification";
import { DELETE_PROJECT_API, LIST_PROJECTS_API } from "../../store/actions";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectsList",
  components: {
    CustomButton,
  },
  methods: {},
  setup() {
    const store = useStoreX();
    const router = useRouter();
    store.dispatch(LIST_PROJECTS_API);
    const { notify } = useNotifier();

    const goToNewProject = () => {
      router.push("/projects/new");
    };

    const deleteProject = (id: string) => {
      store.dispatch(DELETE_PROJECT_API, id).then(() => {
        notify(
          TypeNotification.SUCCESS,
          "Sucesso",
          "Projeto excluído com sucesso"
        );
      });
    };

    return {
      projects: computed(() => store.state.project.projects),
      deleteProject,
      goToNewProject,
    };
  },
});
</script>

<style scoped>
.display-table {
  color: var(--text-primary);
  background: var(--bg-primary);
}
</style>