<template>
  <DefaultLayout title="Habit Tracker">
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate venenatis nisl sit amet egestas. Quisque non dui ac metus interdum
      semper.
    </div>

    <div class="habit-item" v-for="(habit, index) in habits" :key="index">
      <span>{{ habit.name }}</span>

      <div class="habit-item-end">
        <span>{{ calculateDateDifference(habit.startDate) }}</span>

        <IonButton fill="clear" class="delete-button" @click="() => deleteHabit(index)">
          <IonIcon :icon="trashOutline" color="danger" />
        </IonButton>
      </div>
    </div>

    <ModalConfirm
      trigger="delete-habit"
      :is-active="isModalDeleteActive"
      @cancel="closeModalDeleteHabit"
      @confirm="confirmDeleteHabit"
      title="Confirmar Exclusão de Hábito"
    />

    <IonButton name="add-habit" router-link="/add-habit" icon-left="add-circle-outline" expand="full">
      <IonIcon slot="start" :icon="addCircleOutline" />
      Adicionar
    </IonButton>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
import DefaultLayout from '@/components/DefaultLayout.vue';
import ModalConfirm from '@/components/ModalConfirm.vue';
import storage from '@/store';
import calculateDateDifference from '@/utils/calculateDateDifference';

export default defineComponent({
  name: 'HomePage',
  components: {
    DefaultLayout,
    ModalConfirm,
    IonButton,
    IonIcon
  },
  data() {
    return {
      calculateDateDifference,
      addCircleOutline,
      trashOutline,
      habitIndexToDelete: -1,
      isModalDeleteActive: false,
      habits: []
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
    closeModalDeleteHabit() {
      this.isModalDeleteActive = false;
    },
    async confirmDeleteHabit() {
      this.habits.splice(this.habitIndexToDelete, 1);
      this.habitIndexToDelete = -1;

      await storage.set('habits', JSON.stringify(this.habits));

      this.closeModalDeleteHabit();
    }
  }
});
</script>

<style>
.habit-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.delete-button.button button {
  padding: 0px;
}
</style>
