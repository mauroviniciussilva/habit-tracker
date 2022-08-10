<template>
  <DefaultLayout :title="t('addHabit.title')" show-back>
    <TheInput v-model="form.name" :label="t('name')" />
    <IonDatetime v-model="form.startDate" class="ion-margin-top" presentation="date" color="secondary" :max="todayISO" style="margin: 16px 0 auto" />

    <IonButton @click="save" class="ion-margin-top button" expand="block">{{ t('save') }}</IonButton>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import { IonButton, IonDatetime } from '@ionic/vue';
import { NotificationService } from '@/utils/NotificationService';

import storage from '@/store';
import DefaultLayout from '@/components/DefaultLayout.vue';
import TheInput from '@/components/TheInput.vue';

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
  components: {
    DefaultLayout,
    TheInput,
    IonButton,
    IonDatetime
  },
  data() {
    return {
      form: {
        name: null,
        startDate: new Date().toISOString()
      },
      todayISO: new Date().toISOString()
    };
  },
  updated() {
    this.form = { name: null, startDate: new Date().toISOString() };
  },
  methods: {
    async save() {
      const existingHabits = JSON.parse(await storage.get('habits'));

      const habits = [...existingHabits];

      habits.push(this.form);

      await storage.set('habits', JSON.stringify(habits));

      NotificationService.sendNotification();

      this.$router.push('/');
    }
  }
});
</script>
