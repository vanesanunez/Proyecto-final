<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-semibold text-center mb-4">Reportes</h1>

    <!-- Botón de filtro -->
    <div class="flex justify-center mb-4">
      <button @click="toggleFiltro" class="bg-blue-500 text-white px-4 py-2 rounded">
        Filtrar por
      </button>
    </div>

    <!-- Panel de filtros -->
    <div v-if="mostrarFiltro" class="bg-gray-100 p-4 rounded mb-4">
      <div class="space-y-2">
        <label><input type="checkbox" v-model="filtros.masRecientes" /> Más recientes</label><br />
        <label><input type="checkbox" v-model="filtros.pendientes" /> Pendientes de resolución</label><br />
        <label><input type="checkbox" v-model="filtros.resueltos" /> Resueltos</label><br />
      </div>
      <div class="mt-4 flex justify-between">
        <button @click="aplicarFiltros" class="bg-blue-600 text-white px-3 py-1 rounded">Aplicar filtros</button>
        <button @click="limpiarFiltros" class="text-blue-600 underline">Limpiar filtros</button>
      </div>
    </div>

    <!-- Lista de reportes -->
    <div v-for="(reporte, index) in reportesFiltrados" :key="index" class="bg-white border border-gray-300 rounded p-4 mb-4 shadow">
      <h2 class="text-md font-semibold mb-1">{{ reporte.titulo }}</h2>
      <p class="text-sm text-gray-600 mb-1">Enviado: {{ reporte.fecha }}</p>
      <p class="text-sm mb-1">Estado: <span :class="reporte.estado === 'Resuelto' ? 'text-green-600' : 'text-orange-500'">{{ reporte.estado }}</span></p>
      <p class="text-sm text-gray-500">{{ reporte.reclamaron }} personas también reclamaron esto</p>
    </div>
  </div>

   <router-link to="/" class="bg-blue-600 text-white py-2 px-4 rounded block w-1/2 mx-auto block text-center mb-3 hover:bg-blue-700">
      Volver a la página de inicio
    </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'

const mostrarFiltro = ref(false)

const toggleFiltro = () => {
  mostrarFiltro.value = !mostrarFiltro.value
}

// Simulamos reportes por ahora
const reportes = ref([
  { titulo: 'Reporte de bache en avenida', fecha: '02/03/2025', estado: 'Pendiente', reclamaron: 12 },
  { titulo: 'Reporte de peligro de tráfico', fecha: '14/10/2023', estado: 'Resuelto', reclamaron: 15 },
  { titulo: 'Reporte de robo', fecha: '15/08/2024', estado: 'Pendiente', reclamaron: 20 },
  { titulo: 'Reporte de poste de luminaria', fecha: '25/02/2024', estado: 'Resuelto', reclamaron: 10 },
])

const filtros = ref({
  masRecientes: true,
  pendientes: true,
  resueltos: true,
})

const aplicarFiltros = () => {

}

const limpiarFiltros = () => {
  filtros.value = {
    masRecientes: false,
    pendientes: false,
    resueltos: false,
  }
}


const reportesFiltrados = computed(() => {
  return reportes.value.filter(r => {
    return (
      (filtros.value.pendientes && r.estado === 'Pendiente') ||
      (filtros.value.resueltos && r.estado === 'Resuelto')
    )
  })
})
</script>