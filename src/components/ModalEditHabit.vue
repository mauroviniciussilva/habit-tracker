<template>
  <IonModal ref="modal" :presenting-element="$parent.$el" :is-open="isActive">
    <TheHeader :title="name" />
    <IonContent>
      <div id="container">
        <TheInput v-model="startDate" type="date" label="Data de Início" />
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
import { IonButton, IonModal, IonContent, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import TheInput from '@/components/TheInput.vue';

export default defineComponent({
  name: 'ModalEditHabit',
  emits: ['cancel', 'save'],
  components: {
    IonButton,
    IonModal,
    IonContent,
    TheHeader,
    IonRow,
    TheInput,
    IonCol
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
  data() {
    return {
      name: null,
      startDate: null
    };
  },
  watch: {
    habit(newValue) {
      this.name = newValue?.name || null;
      this.startDate = newValue?.startDate || null;
    }
  },
  mounted() {
    this.name = this.habit?.name || null;
    this.startDate = this.habit?.startDate || null;
  },
  methods: {}
});
</script>
