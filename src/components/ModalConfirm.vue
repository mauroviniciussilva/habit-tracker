<template>
  <IonModal ref="modal" :presenting-element="$parent.$el" :is-open="isActive">
    <TheHeader :title="title" />

    <IonContent>
      <div id="container">
        <p class="ion-text-center">{{ description }}</p>
        <IonRow>
          <IonCol>
            <IonButton @click="$emit('cancel')" expand="full" color="light">Cancelar</IonButton>
          </IonCol>
          <IonCol>
            <IonButton @click="$emit('confirm')" expand="full" color="primary">Confirmar</IonButton>
          </IonCol>
        </IonRow>
      </div>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import { IonButton, IonModal, IonContent, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  name: 'ModalConfirm',
  emits: ['cancel', 'confirm'],
  components: {
    IonButton,
    IonModal,
    IonContent,
    TheHeader,
    IonRow,
    IonCol
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirmar Ação'
    },
    description: {
      type: String,
      default: 'Você tem certeza que deseja realizar essa ação?'
    }
  },
  data() {
    return {};
  },
  methods: {}
});
</script>
