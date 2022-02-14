import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from 'vuex';
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, NOTIFY, FINISH_TASK }  from '@/store/mutations';
import { INotification } from "@/interfaces/INotification";
import ITask from "@/interfaces/ITask";

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
        [FINISH_TASK](state, task: ITask) {
            state.tasks.push(task)
        },
        [NOTIFY](state, notification: INotification) {
            
            notification.id = new Date().getTime();
            state.notifications.push(notification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != notification.id);
            }, 3000)

        }

    }
})

export function useStoreX(): Store<State> {
    return useStore(keyStore)
}