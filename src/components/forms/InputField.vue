<script setup lang="ts">
const { link, required, type } = defineProps<{
    name?: string,
    type?: string,
    required?: boolean,
    link?: {
        text: string,
        url: string
    }
}>()
const model = defineModel<string | number>()
</script>

<template>
    <div class="input-field">
        <label>
            <slot></slot>
        </label>
        <input :name="name" :required="required ?? false" :type="type ?? 'text'" v-model="model">
        <RouterLink v-if="link" :to="link.url">{{ link.text }}</RouterLink>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.input-field {
    input {
        width: 100%;
        font-size: inherit;
        background-color: $main;
        border-radius: .5rem;
        padding: .5rem;
    }

    label {
        display: block;
        margin-bottom: .1rem;
        text-align: left;
    }
}
</style>