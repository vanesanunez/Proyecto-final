<script>
import AppH1 from '../components/AppH1.vue';

export default {
    name: 'Register',
    components: { AppH1, },
    data () {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
        }
    },
    methods: {
        handleSubmit() {
            //para hacer
        },
    }
}
</script>

<template>
    <AppH1>Crear una nueva cuenta</AppH1>

    <form action="#"
          @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="email" class="mb-2">Email</label>
            <input 
                type="email" 
                id="email" 
                class="w-full p-2 border border-blue-300 rounded"
                v-model="user.email"
                >
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-2">Contraseña</label>
            <input 
                type="password" 
                id="password" 
                class="w-full p-2 border border-blue-300 rounded">
        </div>
        <button type="submit" class="w-full transition px-4 py-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white"
        >Enviar
        </button>
    </form>
</template>