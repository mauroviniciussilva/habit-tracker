<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <TheHeader :title="title" :show-back="showBack" />
      <slot name="above-container"></slot>
      <div id="container">
        <slot></slot>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  name: 'DefaultLayout',
  props: {
    title: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: undefined
    }
  },
  components: {
    IonPage,
    IonContent,
    TheHeader
  }
});
</script>

<style>
#container {
  position: absolute;
  padding: 20px;
  left: 0;
  right: 0;
}
</style>
