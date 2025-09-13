<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold text-blue-700 mb-4">Nuevo reporte</h2>

    <!-- Mapa o imagen de ubicación -->
    <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
      <span class="text-gray-500">[Mapa aquí]</span>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="enviarReporte">
      <label class="block mb-2">
        Categoría del problema
        <select v-model="categoria" class="w-full mt-1 border rounded px-2 py-1">
          <option disabled value="">Elegí una categoría</option>
          <option>Iluminación</option>
          <option>Infraestructura</option>
          <option>Seguridad</option>
        </select>
      </label>

      <label class="block mt-4 mb-2">
        Descripción
        <textarea v-model="descripcion" class="w-full mt-1 border rounded px-2 py-1" placeholder="Describí lo que ocurrió..."></textarea>
      </label>

      <label class="block mt-4 mb-2">
        Ubicación
        <input v-model="ubicacion" type="text" class="w-full mt-1 border rounded px-2 py-1" placeholder="Calle, número, esquina..." />
      </label>

      <button type="submit" class="bg-coral text-white px-4 py-2 mt-4 rounded w-full hover:bg-opacity-90">
        Enviar reporte
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const categoria = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const router = useRouter()

const enviarReporte = () => {
  console.log('Reporte enviado:', {
    categoria: categoria.value,
    descripcion: descripcion.value,
    ubicacion: ubicacion.value,
  })

  // Redirige a la pantalla de confirmación
  router.push('/report/confirmado')
}
</script>

<style scoped>
.bg-coral {
  background-color: #FF7F50;
}
</style>