<template>
  <ion-header class="the-header">
    <ion-toolbar>
      <ion-buttons slot="start" v-if="showBack">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
});
</script>

<style>
.the-header * {
  color: white !important;
}
</style>
