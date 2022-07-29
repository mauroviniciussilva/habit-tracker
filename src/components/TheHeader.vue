<template>
  <IonHeader class="the-header">
    <IonToolbar class="the-header-toolbar">
      <IonButtons slot="start" v-if="showBack">
        <IonBackButton default-href="/home"></IonBackButton>
      </IonButtons>
      <IonTitle>{{ title }}</IonTitle>
    </IonToolbar>
  </IonHeader>
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
.the-header-toolbar {
  --background: #1e1e1e;
  --border-width: 0px !important;
}
</style>
