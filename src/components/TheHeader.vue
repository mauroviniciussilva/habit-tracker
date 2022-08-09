<template>
  <IonHeader class="the-header">
    <IonToolbar class="the-header-toolbar">
      <IonButtons slot="start" v-if="showBack">
        <IonBackButton default-href="/home"></IonBackButton>
      </IonButtons>
      <IonTitle>{{ title }}</IonTitle>
      <IonButtons slot="end">
        <IonButton v-show="!isSettingsRoute" router-link="/settings" color="light">
          <IonIcon :icon="cogOutline" size="medium" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import { IonHeader, IonIcon, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons } from '@ionic/vue';
import { cogOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  components: {
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
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
    return {
      cogOutline
    };
  },
  computed: {
    isSettingsRoute() {
      return this.$route.path === '/settings';
    }
  }
});
</script>

<style>
.the-header-toolbar {
  --background: #1e1e1e;
  --border-width: 0px !important;
}
</style>
