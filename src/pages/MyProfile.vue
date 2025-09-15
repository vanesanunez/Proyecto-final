<script>
import { RouterLink } from 'vue-router';
import AppH1 from '../components/AppH1.vue';
import {subscribeToUserState} from '../services/auth';


export default {
    name: 'MyProfile',
    components: { AppH1 },
    data() {
        return {
            user: {
                id: null, 
                email: null,
                name: null,
                lastname: null,
                dni: null,
            }
        }
    },
    mounted() {
        subscribeToUserState(newUserState => this.user = newUserState);
    }
}
</script>

<template>
    <div class="flex gap-4 items-end">
        <AppH1 class="text-center">Mi perfil</AppH1>
        <RouterLink to="/mi-perfil/editar" class="mb-4 text-blue-700">Editar</RouterLink>
    </div>

    <dl>
        <dt class="font-bold mb-2">Email</dt>
        <dd class="mb-4">{{ user.email }}</dd>
        <dt class="font-bold mb-2">Nombre</dt>
        <dd class="mb-4">{{ user.name }}</dd>
        <dt class="font-bold mb-2">Apellido</dt>
        <dd class="mb-4">{{ user.lastname }}</dd>
        <dt class="font-bold mb-2">DNI</dt>
        <dd class="mb-4">{{ user.dni }}</dd>
    </dl>
</template>