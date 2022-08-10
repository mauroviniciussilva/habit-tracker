<template>
  <DefaultLayout :title="t('settings.title')" show-back>
    <p>{{ t('settings.generalSettings') }}</p>

    <IonSelect v-model="$i18n.locale" :placeholder="t('settings.selectLanguage')" interface="action-sheet" class="ion-margin-bottom">
      <IonSelectOption v-for="language in languages" :key="language.identifier" :value="language.identifier">{{ language.name }}</IonSelectOption>
    </IonSelect>

    <hr class="hr" />

    <p>{{ t('settings.notifications') }}</p>

    <div class="is-flex ion-align-items-center ion-margin-bottom">
      <IonToggle v-model="notification.enabled"></IonToggle>
      <IonLabel class="ion-margin-start">{{ t('settings.enabledNotification') }}</IonLabel>
    </div>

    <hr class="hr" />

    <p>{{ t('settings.other') }}</p>

    <IonButton name="clear-data" expand="block" @click="clearStorage">{{ t('settings.clearData') }}</IonButton>

    <ModalConfirm
      trigger="clear-data"
      :is-active="isModalClearDataActive"
      @cancel="closeModalClearData"
      @confirm="confirmClearData"
      :description="t('settings.confirmClearData')"
    />
  </DefaultLayout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';

import { defineComponent } from '@vue/runtime-core';
import { IonSelect, IonSelectOption, IonButton, IonLabel, IonToggle, loadingController } from '@ionic/vue';

import { NotificationService } from '@/utils/NotificationService';
import DefaultLayout from '@/components/DefaultLayout.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';

import storage from '@/store';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
  components: {
    DefaultLayout,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonLabel,
    IonToggle,
    ModalConfirm
  },
  data() {
    return {
      isModalClearDataActive: false,
      languages: [
        { name: 'Português', identifier: 'pt-BR' },
        { name: 'English', identifier: 'en-US' }
      ],
      notification: {
        enabled: false
      }
    };
  },
  watch: {
    'notification.enabled': async function watcherEnabledNotification(consent) {
      await NotificationService.setUserConsent(consent);
    }
  },
  methods: {
    clearStorage() {
      this.isModalClearDataActive = true;
    },
    closeModalClearData() {
      this.isModalClearDataActive = false;
    },
    async confirmClearData() {
      this.isModalClearDataActive = false;

      const loading = await loadingController.create({ message: this.t('settings.clearingData') });

      await loading.present();

      await storage.clear();

      await storage.set('habits', JSON.stringify([]));

      await loading.dismiss();
    }
  }
});
</script>

<style>
.hr {
  background: var(--ion-text-color);
}
</style>
