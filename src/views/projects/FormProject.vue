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
import { defineComponent, ref } from "vue";
import { TypeNotification } from "../../interfaces/INotification";
import { useStoreX } from "../../store";
import { notifyMixin } from "../../mixins/notify";
import { ADD_PROJECT_API, UPDATE_PROJECT_API } from "../../store/actions";
import { useRouter } from "vue-router";
import useNotifier from "../../hooks/notifier";

export default defineComponent({
  name: "FormProject",
  props: {
    id: {
      type: String,
    },
  },
  mixins: [notifyMixin],

  setup(props) {

    const store = useStoreX();
    const router = useRouter();
    const projectName = ref("");
    const { notify } = useNotifier();

    if (props.id) {
      const project = store.state.project.projects.find(
        (p) => p.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const onSuccess = () => {
      projectName.value = "";
      notify(TypeNotification.SUCCESS, "Parabéns", "Projeto salvo com sucesso");
      router.push("/projects");
    };

    const saveProject = () => {
      if (props.id) {
        store
          .dispatch(UPDATE_PROJECT_API, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => {
            onSuccess();
          });
      } else {
        store
          .dispatch(ADD_PROJECT_API, { name: projectName.value })
          .then(() => {
            onSuccess();
          });
      }
    };

    return {
      projectName,
      saveProject,
    };
  },
});
</script>

<style scoped>
.display {
  color: var(--text-primary);
}
</style>


function useNotifier(): { notify: any; } {
  throw new Error("Function not implemented.");
}

function useNotifier(): { notify: any; } {
  throw new Error("Function not implemented.");
}

function useRouter() {
  throw new Error("Function not implemented.");
}

function useNotifier(): { notify: any; } {
  throw new Error("Function not implemented.");
}
