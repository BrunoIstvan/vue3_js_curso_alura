import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { ADD_PROJECT_API, DELETE_PROJECT_API, LIST_PROJECTS_API, UPDATE_PROJECT_API } from "@/store/actions";
import { ADD_PROJECT, DEFINE_PROJECTS, DELETE_PROJECT, UPDATE_PROJECT } from "@/store/mutations";
import { Module } from "vuex";

export interface ProjectState {

    projects: IProject[]

}

export const project: Module<ProjectState, State> = {
    state: {
        projects: []
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

    },
    actions: {
        [LIST_PROJECTS_API]({ commit }) {
            http.get('projects')
                .then(response => commit(DEFINE_PROJECTS, response.data));
        },
        [ADD_PROJECT_API](context, project: IProject) {
            return http.post('projects', project);
        },
        [UPDATE_PROJECT_API](context, project: IProject) {
            return http.put(`projects/${project.id}`, project);
        },
        [DELETE_PROJECT_API]({ commit }, id: number) {
            return http.delete(`projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id));
        },

    }
}