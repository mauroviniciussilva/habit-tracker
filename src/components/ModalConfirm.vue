<template>
  <IonModal ref="modal" :presenting-element="$parent.$el" :is-open="isActive">
    <TheHeader :title="title" />
    <IonContent>
      <div id="container">
        <p class="ion-text-center">{{ description }}</p>
        <IonRow>
          <IonCol>
            <IonButton @click="$emit('cancel')" class="button" expand="block" color="light">{{ t('cancel') }}</IonButton>
          </IonCol>
          <IonCol>
            <IonButton @click="$emit('confirm')" class="button" expand="block" color="primary">{{ t('confirm') }}</IonButton>
          </IonCol>
        </IonRow>
      </div>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import { IonButton, IonModal, IonContent, IonRow, IonCol } from '@ionic/vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  name: 'ModalConfirm',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
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
      default: () => {
        const { t } = useI18n({ useScope: 'global' });

        return t('modalConfirm.title');
      }
    },
    description: {
      type: String,
      default: () => {
        const { t } = useI18n({ useScope: 'global' });

        return t('modalConfirm.description');
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
});
</script>
