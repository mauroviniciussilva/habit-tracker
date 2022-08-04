<template>
  <DefaultLayout title="Habit Tracker">
    <template #above-container>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton router-link="/add-habit">
          <IonIcon :icon="addOutline" />
        </IonFabButton>
      </IonFab>
    </template>
    <p>{{ t('homepage.description') }}</p>

    <div class="card habit-item" v-for="(habit, index) in habits" :key="index">
      <span class="habit-item-name">{{ habit.name }}</span>
      <span class="habit-item-days">{{ calculateDateDifference(habit.startDate) }}</span>
      <div class="habit-item-actions">
        <IonButton fill="clear" class="edit-button" size="small" @click="() => editHabit(index)">
          <IonIcon :icon="calendarOutline" color="primary" />
        </IonButton>
        <IonButton fill="clear" class="delete-button" size="small" @click="() => deleteHabit(index)">
          <IonIcon :icon="trashOutline" color="danger" />
        </IonButton>
      </div>
    </div>

    <ModalConfirm
      trigger="delete-habit"
      :is-active="isModalDeleteActive"
      @cancel="closeModalDeleteHabit"
      @confirm="confirmDeleteHabit"
      :title="t('homepage.confirmDeleteHabitTitle')"
    />

    <ModalEditHabit
      trigger="edit-habit"
      :habit="habits[habitIndexToEdit]"
      :is-active="isModalEditActive"
      @cancel="closeModalEditHabit"
      @save="saveHabit"
    />
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/vue';
import { addOutline, addCircleOutline, trashOutline, calendarOutline } from 'ionicons/icons';
import DefaultLayout from '@/components/DefaultLayout.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';
import ModalEditHabit from '@/components/ModalEditHabit.vue';
import storage from '@/store';
import calculateDateDifference from '@/utils/calculateDateDifference';

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
  name: 'HomePage',
  components: {
    DefaultLayout,
    ModalConfirm,
    ModalEditHabit,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  },
  data() {
    return {
      calculateDateDifference,
      addOutline,
      addCircleOutline,
      calendarOutline,
      trashOutline,
      habitIndexToEdit: -1,
      habitIndexToDelete: -1,
      isModalEditActive: false,
      isModalDeleteActive: false,
      habits: [] as Array<{ name: string; startDate: Date }>
    };
  },
  async created() {
    await this.refreshHabits();
  },
  async updated() {
    await this.refreshHabits();
  },
  methods: {
    async refreshHabits() {
      const existingHabits = await storage.get('habits');

      this.habits = JSON.parse(existingHabits);
    },
    deleteHabit(index: number) {
      this.habitIndexToDelete = index;
      this.isModalDeleteActive = true;
    },
    editHabit(index: number) {
      this.habitIndexToEdit = index;
      this.isModalEditActive = true;
    },
    closeModalEditHabit() {
      this.isModalEditActive = false;
    },
    closeModalDeleteHabit() {
      this.isModalDeleteActive = false;
    },
    async confirmDeleteHabit() {
      this.habits.splice(this.habitIndexToDelete, 1);
      this.habitIndexToDelete = -1;

      await storage.set('habits', JSON.stringify(this.habits));

      this.closeModalDeleteHabit();
    },
    async saveHabit(startDate: Date) {
      const habit = this.habits[this.habitIndexToEdit];

      habit.startDate = startDate;

      this.habits.splice(this.habitIndexToDelete, 1, habit);
      this.habitIndexToEdit = -1;

      await storage.set('habits', JSON.stringify(this.habits));

      this.closeModalEditHabit();
    }
  }
});
</script>

<style>
.habit-item {
  display: grid;
  grid-template:
    'name actions'
    'days actions';
  grid-template-columns: 1fr 50px;
  align-items: center;
}

.habit-item-name {
  grid-area: name;
  text-align: center;
  font-weight: 600;
}

.habit-item-days {
  grid-area: days;
  letter-spacing: 1px;
  font-size: 0.85em;
  text-align: center;
}
.habit-item-actions {
  grid-area: actions;
}

.habit-item:not(:first-child) {
  margin-top: 16px;
}

.habit-item-end {
  display: flex;
  align-items: center;
  gap: 8px;
}

.button[name='add-habit'] {
  margin: 0;
  margin-top: 16px;
}

.button-native {
  padding: 0px;
}

.delete-button.button button,
.edit-button.button button {
  padding: 0px;
}
</style>
