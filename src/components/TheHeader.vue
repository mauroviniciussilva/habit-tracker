<template>
  <IonHeader class="the-header">
    <IonToolbar>
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
