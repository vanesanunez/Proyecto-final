<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import { nominatimSearch, nominatimReverse, composeAddress } from '../services/nominatim'

// FIX iconos con Vite
import icon2x from 'leaflet/dist/images/marker-icon-2x.png'
import icon from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: icon2x, iconUrl: icon, shadowUrl: shadow })

const props = defineProps({
  modelValue: { type: Object, default: null }, // { lat, lng }
  height: { type: String, default: '230px' },
  start: { type: Array, default: () => [-34.6037, -58.3816] },
  zoom: { type: Number, default: 13 }
})
const emit = defineEmits(['update:modelValue', 'resolved-address'])

const mapEl = ref(null)
const search = ref('')
const results = ref([])
let map, marker, debounceTimer = null

function setMarker(lat, lng, notify = true) {
  if (!marker) {
    marker = L.marker([lat, lng], { draggable: true }).addTo(map)
    marker.on('dragend', async () => {
      const { lat, lng } = marker.getLatLng()
      emit('update:modelValue', { lat, lng })
      try {
        const rev = await nominatimReverse(lat, lng)
        emit('resolved-address', composeAddress(rev.address) || rev.display_name)
      } catch (e) { console.error(e) }
    })
  } else {
    marker.setLatLng([lat, lng])
  }
  if (notify) emit('update:modelValue', { lat, lng })
}

function onMapClick(e) {
  const { lat, lng } = e.latlng
  setMarker(lat, lng)
  updateAddressFrom(lat, lng)
}

async function updateAddressFrom(lat, lng) {
  try {
    const rev = await nominatimReverse(lat, lng)
    emit('resolved-address', composeAddress(rev.address) || rev.display_name)
  } catch (e) { console.error(e) }
}

function onInput() {
  clearTimeout(debounceTimer)
  if (!search.value || search.value.length < 3) {
    results.value = []
    return
  }
  debounceTimer = setTimeout(async () => {
    try {
      results.value = await nominatimSearch(search.value, { countrycodes: 'ar', limit: 8, lang: 'es' })
    } catch (e) {
      console.error(e)
      results.value = []
    }
  }, 400)
}

function pickSuggestion(item) {
  results.value = []
  search.value = item.display_name
  const lat = parseFloat(item.lat)
  const lng = parseFloat(item.lon)
  map.setView([lat, lng], 17)
  setMarker(lat, lng)
  const texto = composeAddress(item.address) || item.display_name
  emit('resolved-address', texto)
}

onMounted(() => {
  map = L.map(mapEl.value, { zoomControl: false }).setView(props.start, props.zoom)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  L.control.zoom({ position: 'topright' }).addTo(map)
  map.on('click', onMapClick)

  if (props.modelValue?.lat && props.modelValue?.lng) {
    setMarker(props.modelValue.lat, props.modelValue.lng, false)
    map.setView([props.modelValue.lat, props.modelValue.lng], 16)
  }
})

onBeforeUnmount(() => {
  clearTimeout(debounceTimer)
  map?.off()
  map?.remove()
})
</script>

<template>
  <div class="rounded-2xl overflow-hidden border border-gray-200 bg-white">
    <div class="p-2">
      <div class="relative">
        <input
          v-model="search"
          @input="onInput"
          class="w-full rounded-full border px-4 py-2 text-sm"
          placeholder="¿Dónde viste el problema?"
        />
        <ul v-if="results.length"
            class="absolute z-10 bg-white border w-full rounded-xl mt-2 max-h-64 overflow-auto shadow">
          <li v-for="r in results" :key="r.place_id"
              @click="pickSuggestion(r)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
            {{ r.display_name }}
          </li>
        </ul>
      </div>
    </div>

    <div :style="{ height }" ref="mapEl"></div>
  </div>
</template>

<style scoped>
input::placeholder { color: #9aa3a8; }
</style>
