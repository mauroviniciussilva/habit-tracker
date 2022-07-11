<template>
  <DefaultLayout title="Adicionar Hábito" show-back>
    <TheInput v-model="form.name" label="Nome" />
    <TheInput v-model="form.startDate" type="date" label="Data de Início" />

    <IonButton @click="save" class="ion-margin-top" expand="full">Salvar</IonButton>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton } from '@ionic/vue';
import storage from '@/store';
import DefaultLayout from '@/components/DefaultLayout.vue';
import TheInput from '@/components/TheInput.vue';

export default defineComponent({
  components: {
    DefaultLayout,
    TheInput,
    IonButton
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async save() {
      const existingHabits = JSON.parse(await storage.get('habits'));

      const habits = [...existingHabits];

      habits.push(this.form);

      await storage.set('habits', JSON.stringify(habits));

      this.$router.push('/');
    }
  }
});
</script>
