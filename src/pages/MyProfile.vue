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
            }
        }
    },
}
</script>

<template>
    <div class="flex gap-4 items-end">
        <AppH1>Mi perfil</AppH1>
    </div>
</template>