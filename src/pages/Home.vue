<script>
import AppH1 from "../components/AppH1.vue";
import SearchBar from "../components/SearchBar.vue";
import ActionCard from "../components/ActionCard.vue";
import ReportCarousel from "../components/ReportCarousel.vue";
import BottomNav from "../components/BottomNav.vue";
import InfoCard from '../components/InfoCard.vue';


const onSearch = (q) => {
  if (!q) return;
 
  // router.push({ name: 'Reports', query: { q } })
  console.log("buscar:", q);
};

export default {
  name: "Home",
  components: { AppH1, SearchBar, ActionCard, ReportCarousel, BottomNav, InfoCard },
};
</script>

<template>
  <AppH1>¡Bienvenidos a Vía Segura!</AppH1>

  <div class="min-h-screen pb-28">
    <!-- pb para que no tape bottom nav -->
    <AppHeader />

    <main class="max-w-md mx-auto px-4">
      <SearchBar @search="onSearch" />

      <div class="mt-6">
          <InfoCard />
        </div>

      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ActionCard title="Hacer un reporte" to="/report/nuevo" accent="blue">
          <template #icon>✋</template>
        </ActionCard>

        <ActionCard title="Ver reportes" to="/reportes" accent="coral">
          <template #icon>🚩</template>
        </ActionCard>

         

        <ActionCard
          title="Contactos de confianza"
          to="/contactos"
          accent="yellow"
        >
          <template #icon>👥</template>
        </ActionCard>

        <ActionCard
          title="Recorrido seguro"
          to="/recorrido-seguro"
          accent="blue2"
        >
          <template #icon>🏠</template>
        </ActionCard>
      </section>

      
     
       
     

      <p class="text-center text-sm text-brandCoral mt-6">
        Últimos reportes y novedades cerca tuyo
      </p>

      <ReportCarousel />
      <div class="h-6"></div>
    </main>

    <BottomNav />
  </div>
</template>
