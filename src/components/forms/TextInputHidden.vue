<script setup lang="ts">
import { ref } from 'vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';

defineEmits<{
    (e: 'saved'): void
}>()

const { required, type } = defineProps<{
    name?: string,
    type?: string,
    required?: boolean
}>()

const model = defineModel<string | number>()
const original = ref(model.value)
</script>

<template>
    <div class="text-input-hidden">
        <input :name="name" :required="required ?? false" :type="type ?? 'text'" v-model="model">
        <CheckIcon :class="{ inactive: model === original }" class="check"
            @click="() => { original = model; $emit('saved'); console.log(model) }" />
        <XIcon :class="{ inactive: model === original }" class="x" @click="() => model = original" />
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.text-input-hidden {
    display: grid;
    grid-template: 1lh 1lh / 2rem 2rem auto;
    gap: .5rem .25rem;

    input {
        grid-column: 1 / 4;
        width: 100%;
        font-size: inherit;
        background: none;
        border: none;
    }

    input:focus {
        border: none;
    }

    svg {
        height: 1lh;
        background: none;
        border: none;
        border-radius: 100%;
        padding: 5px;
    }

    svg:hover {
        cursor: pointer;
    }

    svg.check {
        background-color: $accent;
    }

    svg.x {
        background-color: $red;
    }

    svg.inactive {
        background-color: $main-lighter;
    }

    svg.inactive:hover {
        cursor: unset;
        pointer-events: none;
    }
}
</style>