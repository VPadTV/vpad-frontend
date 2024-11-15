<script setup lang="ts">
import type { InputFieldProps } from '.'

const { required, type, ...linkProps } = defineProps<InputFieldProps>()
const model = defineModel<string | number>()
</script>

<template>
  <div class="input-field">
    <label>
      <slot></slot>
    </label>
    <input :name="name" :required="required ?? false" :type="type ?? 'text'" v-model="model" />
    <RouterLink v-if="linkProps.hasLink" :to="linkProps.href ?? ''">{{
      linkProps.linkText
    }}</RouterLink>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.input-field {
  input {
    width: 100%;
    font-size: inherit;
    background-color: $main;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.1rem;
    text-align: left;
  }
}
</style>
