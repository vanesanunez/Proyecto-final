import { createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home.vue';
import GlobalChat from '../pages/GlobalChat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [

    {path: '/',                  component:  Home,      },
    {path: '/chat',              component: GlobalChat, },
    {path: '/ingresar',          component: Login,      },
    {path: '/crear-cuenta',      component: Register,   },

];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;