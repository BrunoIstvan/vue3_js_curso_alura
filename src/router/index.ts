import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/tasks/TasksView.vue';
import ProjectsView from '../views/projects/ProjectsView.vue'
import FormProject from '../views/projects/FormProject.vue';
import ProjectsList from '../views/projects/ProjectsList.vue';


const my_routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksView
    },
    {
        path: '/projects',
        component: ProjectsView,
        children: [
            {
                path: '',
                name: 'Projects List',
                component: ProjectsList
            },
            {
                path: 'new',
                name: 'New Project',
                component: FormProject
            },
            {
                path: ':id',
                name: 'Edit Project',
                component: FormProject,
                props: true
            }
        ]
    },

];

const my_router = createRouter({
    history: createWebHashHistory(),
    routes: my_routes
})

export default my_router;
