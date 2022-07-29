<template>
  <IonModal ref="modal" :presenting-element="$parent.$el" :is-open="isActive">
    <TheHeader :title="name || ''" />
    <IonContent>
      <div id="container">
        <IonButton expand="block" color="secondary" @click="setDateStartToToday">Hoje</IonButton>
        <IonDatetime v-model="startDate" presentation="date" color="secondary" :max="todayISO" style="margin: auto" />
        <IonRow>
          <IonCol>
            <IonButton @click="$emit('cancel')" class="button" expand="block" color="light">Cancelar</IonButton>
          </IonCol>
          <IonCol>
            <IonButton @click="$emit('save', startDate)" class="button" expand="block" color="primary">Confirmar</IonButton>
          </IonCol>
        </IonRow>
      </div>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import { IonButton, IonModal, IonContent, IonRow, IonCol, IonDatetime } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  name: 'ModalEditHabit',
  emits: ['cancel', 'save'],
  components: {
    IonButton,
    IonModal,
    IonContent,
    TheHeader,
    IonRow,
    IonCol,
    IonDatetime
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    habit: {
      type: Object,
      false: true,
      validator: (value: Record<string, unknown> | null | undefined) => {
        if (value === null || value === undefined) return true;

        const hasNameInValue = Object.prototype.hasOwnProperty.call(value, 'name');
        const hasStartDateInValue = Object.prototype.hasOwnProperty.call(value, 'startDate');

        return hasNameInValue && hasStartDateInValue;
      }
    }
  },
  data(): { name: string | null; startDate: string | null; todayISO: string } {
    return {
      name: null,
      startDate: null,
      todayISO: new Date().toISOString()
    };
  },
  watch: {
    isActive(newValue) {
      if (newValue) {
        this.name = this.habit?.name || null;
        this.startDate = this.habit?.startDate || null;
      }
    },
    habit(newValue) {
      this.name = newValue?.name || null;
      this.startDate = newValue?.startDate || null;
    }
  },
  mounted() {
    this.name = this.habit?.name || null;
    this.startDate = this.habit?.startDate || null;
  },
  methods: {
    setDateStartToToday() {
      this.startDate = new Date().toISOString();
    }
  }
});
</script>
