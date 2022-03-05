<template>
  <div>
    <FormTask @whenSaveTask="saveTask" />

    <div class="lista">
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Digite para filtrar"
            v-model="filter"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>

      <TaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @whenEditTaskIsClicked="openModalForEditingTask(task)"
        @whenDeleteTaskIsClicked="openModalForDeletingTask(task)"
      />
      <CustomBox v-if="isEmptyList">
        Você não está muito produtivo hoje
      </CustomBox>
    </div>
    <CustomModal
      okText="Salvar"
      title="Alterar tarefa"
      cancelText="Cancelar"
      :activeModal="selectedTaskForEditing != null"
      @whenCloseModal="closeModalUpdating"
      @whenClickOk="updateTask"
      v-if="selectedTaskForEditing"
    >
      <div
        class="column is-12"
        role="form"
        aria-label="Formulário para alteração de uma tarefa"
      >
        <input
          type="text"
          class="input"
          id="taskDescription"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="selectedTaskForEditing.description"
        />
      </div>
    </CustomModal>
    <CustomModal
      okText="Excluir"
      title="Excluir tarefa"
      cancelText="Cancelar"
      :activeModal="selectedTaskForDeleting != null"
      @whenCloseModal="closeModalDeleting"
      @whenClickOk="deleteTask"
      v-if="selectedTaskForDeleting"
    >
      <div class="column is-12">
        {{
          `Confirma a exclusão da Tarefa ${selectedTaskForDeleting.description}?`
        }}
      </div>
    </CustomModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormTask from "./components/FormTask.vue";
import TaskItem from "./components/TaskItem.vue";
import ITask from "../../interfaces/ITask";
import CustomBox from "../components/customs/CustomBox.vue";
import CustomModal from "../components/CustomModal.vue";
import { useStoreX } from "../../store";
import {
  DELETE_TASK_API,
  FINISH_TASK_API,
  LIST_PROJECTS_API,
  LIST_TASKS_API,
  UPDATE_TASK_API,
} from "../../store/actions";
import { notifyMixin } from "../../mixins/notify";
import { TypeNotification } from "../../interfaces/INotification";
import useNotifier from "../../hooks/notifier";

export default defineComponent({
  name: "TasksView",
  mixins: [notifyMixin],
  components: {
    FormTask,
    TaskItem,
    CustomBox,
    CustomModal,
  },
  computed: {
    isEmptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  setup() {
    const store = useStoreX();
    const { notify } = useNotifier();

    store.dispatch(LIST_TASKS_API);
    store.dispatch(LIST_PROJECTS_API);

    const selectedTaskForEditing = ref<ITask>();
    const selectedTaskForDeleting = ref<ITask>();
    const filter = ref("");

    const saveTask = (task: ITask): void => {
      store.dispatch(FINISH_TASK_API, task).then(() => {
        notify(
          TypeNotification.SUCCESS,
          "Parabéns",
          "Task encerrada com sucesso"
        );
      });
    };

    const openModalForEditingTask = (task: ITask): void => {
      selectedTaskForEditing.value = { ...task };
      console.log(selectedTaskForEditing.value);
    };

    const closeModalUpdating = (): void => {
      selectedTaskForEditing.value = undefined;
    };

    const updateTask = (): void => {
      if (selectedTaskForEditing.value) {
        store
          .dispatch(UPDATE_TASK_API, selectedTaskForEditing.value)
          .then(() => {
            closeModalUpdating();
            notify(
              TypeNotification.SUCCESS,
              "Parabéns",
              "Descrição da tarefa atualizada com sucesso"
            );
          });
      }
    };

    const openModalForDeletingTask = (task: ITask): void => {
      selectedTaskForDeleting.value = { ...task };
    };

    const closeModalDeleting = (): void => {
      selectedTaskForDeleting.value = undefined;
    };

    const deleteTask = (): void => {
      if (selectedTaskForDeleting.value) {
        store
          .dispatch(DELETE_TASK_API, selectedTaskForDeleting.value)
          .then(() => {
            closeModalDeleting();
            notify(
              TypeNotification.SUCCESS,
              "Agora já foi",
              "Tarefa excluída com sucesso"
            );
          });
      }
    };

    watchEffect(() => {
      store.dispatch(LIST_TASKS_API, filter.value);
    });

    return {
      store,
      selectedTaskForEditing,
      selectedTaskForDeleting,

      saveTask,
      openModalForEditingTask,
      closeModalUpdating,
      updateTask,

      openModalForDeletingTask,
      closeModalDeleting,
      deleteTask,

      filter,
      tasks: computed(() => {
        return store.state.task.tasks;
      }),
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
