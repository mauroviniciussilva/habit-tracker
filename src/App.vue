<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import storage from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  async created() {
    await storage.create();

    const existingHabits = await storage.get('habits');

    if (!existingHabits) {
      await storage.set('habits', JSON.stringify([]));
    }
  }
});
</script>

<style>
.toolbar-content {
  display: flex !important;
}
</style>
