<script setup lang="ts">
const { link, required, type } = defineProps<{
    type?: string,
    required?: boolean,
    link?: {
        text: string,
        url: string
    }
}>()
const model = defineModel<string>()
</script>

<template>
    <div class="text-input">
        <label>
            <slot></slot>
        </label>
        <input :required="required ?? false" :type="type ?? 'text'" v-model="model">
        <RouterLink v-if="link" :to="link.url">{{ link.text }}</RouterLink>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.text-input {
    width: 100%;

    input {
        width: 100%;
        font-size: inherit;
        background-color: $main;
        border-radius: .5rem;
        padding: .5rem;
    }

    label {
        display: block;
        margin-bottom: 2px;
        text-align: left;
    }
}
</style>