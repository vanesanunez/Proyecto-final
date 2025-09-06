<script>
import AppH1 from '../components/AppH1.vue';

export default {
    name: 'Login',
    components: { AppH1, },
}
</script>

<template>
    <AppH1>Ingresar a mi cuenta</AppH1>
    <form action="#">
        <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input type="email" id="email" class="form-control">
        </div>
        <div class="mb-3">
            <label for="password" class="mb-2">Contraseña</label>
            <input type="password" id="password" class="form-control">
        </div>
        <button type="submit" class="">Ingresar</button>
    </form>
</template>