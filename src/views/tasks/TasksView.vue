<template>
  <div>
    <FormTask @whenSaveTask="saveTask" />
    <div class="lista">
      <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @whenTaskIsSelected="openTaskForEditing(task)" />
      <CustomBox v-if="isEmptyList">
        Você não está muito produtivo hoje
      </CustomBox>
    </div>
    <ModalOkCancel okText="Salvar tarefa" title="Alterar tarefa" 
      cancelText="Cancelar" :activeModal="selectedTask != null" 
      @whenCloseModal="closeModal" @whenClickOk="updateTask" v-if="selectedTask">
      <div
        class="column is-6"
        role="form"
        aria-label="Formulário para alteração de uma tarefa"
      >
        <input
          type="text"
          class="input"
          id="taskDescription"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="selectedTask.description"
        />
      </div>
    </ModalOkCancel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormTask from "../../components/tasks/FormTask.vue";
import TaskItem from "../../components/tasks/TaskItem.vue";
import ITask from "../../interfaces/ITask";
import CustomBox from "../../components/customs/CustomBox.vue";
import ModalOkCancel from '../../components/ModalOkCancel.vue';
import { useStoreX } from "../../store";
import { FINISH_TASK_API, LIST_TASKS_API, UPDATE_TASK_API } from "../../store/actions";
import { notifyMixin } from "../../mixins/notify";
import { TypeNotification } from "../../interfaces/INotification";

export default defineComponent({
  name: "TasksView",
  data() {
    return {
      selectedTask: null as ITask | null,
      // activeModal: false,
      // taskDescription: ''
    };
  },
  mixins: [notifyMixin],
  components: {
    FormTask,
    TaskItem,
    CustomBox,
    ModalOkCancel,
  },
  methods: {
    saveTask(task: ITask): void {
      this.store.dispatch(FINISH_TASK_API, task)
        .then(() => {
          this.notify(TypeNotification.SUCCESS, 'Parabéns', 'Task encerrada com sucesso');
        });
    },
    openTaskForEditing(task: ITask): void {
      this.selectedTask = { ...task };
      // this.taskDescription = this.selectedTask.description;
      // this.activeModal = true;
    },
    closeModal(): void {
      // this.activeModal = false;
      this.selectedTask = null
    },
    updateTask() : void {
      if(this.selectedTask != null && this.selectedTask != undefined ) {
        // this.selectedTask.description = this.taskDescription || 'null';
        this.store.dispatch(UPDATE_TASK_API, this.selectedTask)
          .then(() => {
            // this.activeModal = false;
            this.selectedTask = null;
            this.notify(TypeNotification.SUCCESS, 'Parabéns', 'Descrição da tarefa atualizada com sucesso');
          });
      }
    }
  },
  computed: {
    isEmptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  setup() {
    const store = useStoreX();

    store.dispatch(LIST_TASKS_API);

    return {      
      store,
      tasks: computed(() => store.state.tasks)
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
