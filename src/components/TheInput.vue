<template>
  <div class="the-input-wrapper">
    <label class="the-input-label">{{ label }}</label>
    <IonInput class="the-input" v-bind="$attrs" :type="type" v-model="value" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import { IonInput } from '@ionic/vue';

export default defineComponent({
  name: 'TheInput',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
  emits: ['update:modelValue'],
  components: { IonInput },
  props: {
    modelValue: {
      type: undefined,
      default: undefined
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: () => {
        const { t } = useI18n({ useScope: 'global' });
        return t('input.placeholder');
      }
    }
  },
  data() {
    return {
      value: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      this.$emit('update:modelValue', newValue);
    }
  }
});
</script>

<style>
.the-input-wrapper + .the-input-wrapper {
  margin-top: 16px;
}

.the-input-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

.the-input > input {
  background-color: white !important;
  color: #1e1e1e !important;
  padding: 10px !important;
  border-radius: 6px !important;
}
</style>
