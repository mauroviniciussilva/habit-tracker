<template>
  <DefaultLayout title="Configurações" show-back>
    <p>Configurações Gerais</p>

    <hr class="hr" />

    <p>Notificações</p>

    <hr class="hr" />

    <p>Limpar dados</p>
  </DefaultLayout>
</template>

<script lang="ts">
// import { IonButton } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import DefaultLayout from '@/components/DefaultLayout.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    DefaultLayout
  }
});
</script>

<style>
.hr {
  background: var(--ion-text-color);
}
</style>
