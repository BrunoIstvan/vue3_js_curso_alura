import { InjectionKey } from "vue";
import { createStore, Store, useStore } from 'vuex';
import { NOTIFY } from '@/store/mutations';
import { INotification } from "@/interfaces/INotification";
import { ProjectState, project } from "./modules/project";
import { task, TaskState } from "./modules/task";


export interface State {
    notifications: INotification[],
    task: TaskState,
    project: ProjectState
}

export const keyStore: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        notifications: [],
        task: {
            tasks: []
        },
        project: {
            projects: []
        }
    },
    mutations: {

        [NOTIFY](state, notification: INotification) {

            notification.id = new Date().getTime();
            state.notifications.push(notification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != notification.id);
            }, 3000)

        }

    },
    actions: {

    },
    modules: {
        project,
        task
    }
})

export function useStoreX(): Store<State> {
    return useStore(keyStore)
}