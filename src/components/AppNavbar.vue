<script>
import { RouterLink } from 'vue-router';
import { logout, subscribeToUserState } from '../services/auth';

export default {
    name: 'AppNavbar',
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/ingresar');
        }
    },
    mounted() {
        //se suscribe al estado de autenticación
        subscribeToUserState(newUserState => this.user = newUserState);
    }
}
</script>

<template>
    <nav class="flex justify-between items-center gap-8 p-4 colorinst ">
        <RouterLink class="text-xl" to="/">Vía Segura</RouterLink>
            <ul class="flex gap-4">
                <li><RouterLink to="/">Home</RouterLink></li>
                <li ><RouterLink to="/chat">Chat general</RouterLink></li>
                <li ><RouterLink to="/ingresar">Ingresar</RouterLink></li>
                <li ><RouterLink to="/crear-cuenta">Crear cuenta</RouterLink></li>  
                 
            </ul>
    </nav>
</template>