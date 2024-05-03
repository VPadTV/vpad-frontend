<script setup lang="ts">
import { ref } from 'vue'
import CheckIcon from '@shared/components/CheckIcon'
import XIcon from '@shared/components/XIcon'

const { type } = defineProps<{
    readonly type?: string
    readonly required?: string
}
>()
const model = defineModel<string>()
defineEmits<{
    (e: 'saved', value: string): void
}>()

const original = ref(model.value)
</script>

<template>
    <div class="input-field">
        <label>
            <slot></slot>
        </label>
        <div class="input-save">
            <textarea :type="type ?? 'text'" v-model="model"></textarea>
            <span v-if="model !== original">
                <button class="check" @click="() => {
                original = model
                $emit('saved', model ?? '')
            }">
                    <CheckIcon />
                </button>
                <button class=" x" @click="() => (model = original)">
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
        column-gap: 0.5rem;

        textarea {
            font-size: inherit;
            background-color: $main;
            border-radius: 0.5rem;
            padding: 0.5rem;

            width: 100%;
            resize: vertical;
            min-width: 24ch;
            max-width: 60%;
            min-height: 2lh;
            max-height: 16lh;
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
            margin-right: 0.5rem;
        }

        .x {
            background-color: $light-red;
        }
    }
}
</style>
