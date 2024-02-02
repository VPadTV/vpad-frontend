<script setup lang="ts">
import CheckIcon from '@/components/icons/CheckIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';

const model = defineModel<boolean>();
const { name } = defineProps<{ name: string }>();
</script>

<template>
    <div class="input-field radio-field">
        <label :for="name" class="radio-label">
            <div :class="{ check: model }">
                <CheckIcon :class="{ hidden: !model }" />
                <XIcon :class="{ hidden: model }" />
            </div>
            <slot></slot>
        </label>
        <input class="hidden" :name="name" :id="name" type="checkbox" v-model="model">
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.radio-label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    column-gap: .5rem;

    h2 {
        display: inline-block;

    }

    div {
        display: inherit;
        aspect-ratio: 1;
        border-radius: 100%;
        padding: .2rem;
        background-color: $light-red;
    }

    svg {
        height: 1.5rem;
    }

    .check {
        background-color: $accent;
    }
}

.radio-label:hover {
    cursor: pointer;
}
</style>