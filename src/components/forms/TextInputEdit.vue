<script setup lang="ts">
import { ref } from 'vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';

const { type } = defineProps<{
    type?: string,
    required?: boolean
}>()
const model = defineModel<string>()

const original = ref(model.value)
</script>

<template>
    <div class="input-field">
        <label>
            <slot></slot>
        </label>
        <div class="input-save">
            <input :type="type ?? 'text'" v-model="model">
            <span v-if="model !== original">
                <button class="check" @click="() => { original = model; $emit('saved') }">
                    <CheckIcon />
                </button>
                <button class="x" @click="() => model = original">
                    <XIcon />
                </button>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.input-field {
    width: 100%;

    label {
        display: block;
        margin-bottom: 2px;
        text-align: left;
    }

    .input-save {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        column-gap: .5rem;

        input {
            width: 100%;
            display: inline-block;
            font-size: inherit;
            resize: horizontal;
            max-width: 60%;
            background-color: $main;
            border-radius: .5rem;
            padding: .5rem;
        }

        button {
            $size: 2rem;
            text-align: center;
            display: inline-block;
            border: none;
            border-radius: 100%;
            width: $size;
            height: $size;

            svg {
                height: 80%;
                text-align: center;
                vertical-align: middle;
            }
        }

        .check {
            background-color: $accent;
            margin-right: .5rem;
        }

        .x {
            background-color: $light-red;
        }
    }

}
</style>