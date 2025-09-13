<script setup>
import { ref } from 'vue'

const data = ref([])
const loading = ref(false)
const error = ref(null)
const open = ref(false)

const fetchInfo = async () => {
  // si ya está abierto, cerramos
  if (open.value) {
    open.value = false
    return
  }

  loading.value = true
  error.value = null
  try {
    const response = await fetch("https://datosabiertos-apis.buenosaires.gob.ar/datos_utiles/v1/servicios")
    const result = await response.json()
    data.value = result
    open.value = true
  } catch (err) {
    error.value = "No se pudo cargar la información"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
    <h2 class="text-xl font-bold text-blue-700 mb-4">ℹ️ Info Útil</h2>
    
    <!-- Botón -->
    <button 
      @click="fetchInfo"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      {{ open ? "Cerrar información" : "Ver información de CABA" }}
    </button>

    <!-- Contenido desplegable -->
    <transition name="fade">
      <div v-if="open" class="mt-4">
        <p v-if="loading" class="text-gray-500">Cargando...</p>
        <p v-if="error" class="text-red-500">{{ error }}</p>

        <ul v-if="data.length" class="space-y-2">
          <li 
            v-for="(item, index) in data.slice(0,5)" 
            :key="index"
            class="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm shadow-sm"
          >
            <p class="font-semibold text-blue-600">📍 {{ item.nombre }}</p>
            <p class="text-gray-700">{{ item.descripcion }}</p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>