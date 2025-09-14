import { createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home.vue';
import GlobalChat from '../pages/GlobalChat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import MyProfile from '../pages/MyProfile.vue';

const routes = [

    {path: '/',                  component:  Home,      },
    {path: '/chat',              component: GlobalChat, },
    {path: '/ingresar',          component: Login,      },
    {path: '/crear-cuenta',      component: Register,   },
    {path: '/mi-perfil',         component: MyProfile, },


    
  // Ruta para crear nuevo reporte
  {
    path: '/report/nuevo',
    name: 'NuevoReporte',
    component: () => import('../pages/NewReport.vue'),
  },

  //  Ruta de confirmación después de enviar reporte
  {
    path: '/report/confirmado',
    name: 'ConfirmacionReporte',
    component: () => import('../pages/ReportConfirm.vue'),
  },

  {
  path: '/reportes',
  name: 'VerReportes',
  component: () => import('../pages/ViewReports.vue'),
}

];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;