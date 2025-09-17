<script>
import AppH1 from '../components/AppH1.vue';
import {subscribeToUserState, updateAuthUserProfile} from '../services/auth';
import MainLoader from '../components/MainLoader.vue';

//Variable para guardar la función de cancelar la suscripción a la autenticación.
let unsubAuth = () => {}

export default {
    name: 'MyProfileEdit',
    components: { AppH1, MainLoader },
    data() {
        return {
            user: {
                id: null, 
                email: null,
                name: null,
                lastname: null,
                dni: null,
            },
            profile: {
                email: null,
                name: null,
                lastname: null,
            },
            updating: false,
        }
    },
    methods: {
        async handleSubmit() {
            try {
                this.updating = true;
                await updateAuthUserProfile({
                    ...this.profile
                });
                this.updating = false;
            } catch (error) {
                //manejar el error
            }
        }
    },
    mounted() {
       unsubAuth = subscribeToUserState(newUserState => {
            this.user = newUserState;

            //datos iniciales del form
            this.profile = {
                email: this.user.email,
                name: this.user.name,
                lastname: this.user.lastname,
            }
        });
    },
    unmounted() {
        //cancelar la suscripción 
        unsubAuth();
    }
}
</script>

<template>
    <div class="flex gap-4 items-end">
        <AppH1>Editar mi perfil</AppH1>
    </div>
    <form action="#"
          @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input 
                type="text"
                id="email"
                class="w-full p-2 border border-blue-400 rounded"
                v-model="profile.email">
        </div>
        <div class="mb-4">
            <label for="name" class="block mb-2">Nombre</label>
            <input 
                type="text"
                id="name"
                class="w-full p-2 border border-blue-400 rounded"
                v-model="profile.name">
        </div>
        <div class="mb-4">
            <label for="lastname" class="block mb-2">Apellido</label>
            <input 
                type="text"
                id="lastname"
                class="w-full p-2 border border-blue-400 rounded"
                v-model="profile.lastname">
        </div>
        <button type="submit" class="w-full transition px-4 py-2 rounded cursor-pointer bg-blue-600
                 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white"
                >Actualizar
                </button>
    </form>
   
</template>