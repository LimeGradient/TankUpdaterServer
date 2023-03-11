import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Home from "./components/Home.vue"
import UploadGame from "./components/UploadGame.vue";

const routes = [
    {path: "/", component: Home},
    {path: "/upload", component: UploadGame},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;