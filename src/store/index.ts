import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from 'vuex';
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, NOTIFY, FINISH_TASK, DEFINE_PROJECTS, DEFINE_TASKS, UPDATE_TASK }  from '@/store/mutations';
import { INotification } from "@/interfaces/INotification";
import ITask from "@/interfaces/ITask";
import { ADD_PROJECT_API, DELETE_PROJECT_API, FINISH_TASK_API, LIST_PROJECTS_API, LIST_TASKS_API, UPDATE_PROJECT_API, UPDATE_TASK_API } from "./actions";
import http from '@/http';


interface State {
    projects: IProject[],
    notifications: INotification[],
    tasks: ITask[],
}

export const keyStore: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: [],
        tasks: []
    },
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject;
            state.projects.push(project)
        },
        [UPDATE_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(p => p.id == project.id);
            state.projects[index] = project;
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(p => p.id != id);
        },
        [DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects;
        },
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
        [NOTIFY](state, notification: INotification) {
            
            notification.id = new Date().getTime();
            state.notifications.push(notification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != notification.id);
            }, 3000)

        }

    },
    actions: { 
        [LIST_PROJECTS_API]({ commit }) {
            http.get('projects')
                .then(response => commit(DEFINE_PROJECTS, response.data));
        },
        [ADD_PROJECT_API](context, project: IProject ) {
            return http.post('projects', project );
        },
        [UPDATE_PROJECT_API](context, project: IProject ) {
            return http.put(`projects/${project.id}`, project );
        },
        [DELETE_PROJECT_API]({ commit }, id: number ) {
            return http.delete(`projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id));
        },
        [LIST_TASKS_API]({ commit }) {
            http.get('tasks')
                .then(response => commit(DEFINE_TASKS, response.data));
        },
        [FINISH_TASK_API](context, task: ITask ) {
            return http.post('tasks', task )
                .then(response => this.commit(FINISH_TASK, response.data));
        },
        [UPDATE_TASK_API](context, task: ITask ) {
            return http.put(`tasks/${task.id}`, task )
                .then(response => this.commit(UPDATE_TASK, response.data));
        },
    }
})

export function useStoreX(): Store<State> {
    return useStore(keyStore)
}