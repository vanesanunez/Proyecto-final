<script>
import AppH1 from '../components/AppH1.vue';
import {subscribeToUserState} from '../services/auth';


export default {
    name: 'MyProfileEdit',
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
        <AppH1>Editar mi perfil</AppH1>
    </div>
    <form action="#">
        
    </form>
   
</template>