<script setup lang="ts">
import type { TextAreaInputField } from '.'

const { required } = defineProps<TextAreaInputField>()
const model = defineModel<string>()
</script>

<template>
  <div class="input-field">
    <label>
      <slot></slot>
    </label>
    <textarea
      :style="{
        maxWidth,
        minWidth,
        resize
      }"
      :required="required ?? false"
      v-model="model"
    ></textarea>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.input-field {
  textarea {
    font-size: inherit;
    background-color: $main;
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem;

    resize: both;
    min-width: 24ch;
    min-height: 2lh;
    max-width: 100%;
    max-height: 16lh;

    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 2px;
    text-align: left;
  }
}
</style>
