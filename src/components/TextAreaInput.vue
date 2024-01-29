<script setup lang="ts">
const { required } = defineProps<{
    required?: boolean,
}>()
const model = defineModel<string>()
</script>

<template>
    <div class="text-input">
        <label>
            <slot></slot>
        </label>
        <textarea :required="required ?? false" v-model="model"></textarea>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.text-input {
    textarea {
        font-size: inherit;
        background-color: $main;
        border: 0;
        border-radius: .5rem;
        padding: .5rem;

        resize: both;
        min-width: 24ch;
        min-height: 2lh;
        max-width: 50vw;
        max-height: 20vh;
    }

    label {
        display: block;
        margin-bottom: 2px;
        text-align: left;
    }
}
</style>