<script>
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
        <AppH1>Mi perfil</AppH1>
    </div>

    <dl>
        <dt class="font-bold mb-2">Email</dt>
        <dd class="mb-4">{{ user.email }}</dd>
        <dt class="font-bold mb-2">Nombre</dt>
        <dd class="mb-4">nombre</dd>
        <dt class="font-bold mb-2">Apellido</dt>
        <dd class="mb-4">apellido</dd>
        <dt class="font-bold mb-2">Teléfono</dt>
        <dd class="mb-4">teléfono</dd>
        <dt class="font-bold mb-2">DNI</dt>
        <dd class="mb-4">dni número</dd>
    </dl>
</template>