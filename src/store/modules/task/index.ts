import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { DELETE_TASK_API, FINISH_TASK_API, LIST_TASKS_API, UPDATE_TASK_API } from "@/store/actions";
import { DEFINE_TASKS, DELETE_TASK, FINISH_TASK, UPDATE_TASK } from "@/store/mutations";
import { Module } from "vuex";

export interface TaskState {

    tasks: ITask[]

}

export const task: Module<TaskState, State> = {
    state: {
        tasks: []
    },
    mutations: {
        [FINISH_TASK](state, task: ITask) {
            state.tasks.push(task)
        },
        [UPDATE_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id);
            state.tasks[index] = task;
        },
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks;
        },
        [DELETE_TASK](state, id: string) {
            state.tasks = state.tasks.filter(p => p.id != id);
        },
    },
    actions: {
        [LIST_TASKS_API]({ commit }) {
            http.get('tasks')
                .then(response => { commit(DEFINE_TASKS, response.data); });
        },
        [FINISH_TASK_API](context, task: ITask) {
            return http.post('tasks', task)
                .then(response => this.commit(FINISH_TASK, response.data));
        },
        [UPDATE_TASK_API](context, task: ITask) {
            return http.put(`tasks/${task.id}`, task)
                .then(response => this.commit(UPDATE_TASK, response.data));
        },
        [DELETE_TASK_API](context, task: ITask) {
            return http.delete(`tasks/${task.id}`)
                .then(() => this.commit(DELETE_TASK, task.id));
        },
    },
}