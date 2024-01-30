<script setup lang="ts">
import type { VNodeRef } from 'vue';

const model = defineModel<File>({});
const { name, includeFilename } = defineProps<{
    name: string,
    includeFilename?: boolean,
    labelStyle?: any,
    inputRef?: VNodeRef
}>();
const emit = defineEmits<{
    (e: 'changed', url: string): void
}>()

function fileChanged(ev: Event) {
    const files = (ev.target as HTMLInputElement)?.files
    if (files && files.length > 0) {
        const file = files.item(0)!
        model.value = file
        emit('changed', URL.createObjectURL(file))
    }
}

</script>

<template>
    <div class="file-field">
        <label class="file-label" :for="name" :style="labelStyle">
            <span v-if="includeFilename && model?.name" class="filename">{{ model?.name }}</span>
            <span v-else-if="includeFilename && !model?.name" class="filename">
                <slot></slot>
            </span>
            <slot v-else></slot>
        </label>
        <input :ref="inputRef" class="hidden" :name="name" :id="name" type="file" @change="fileChanged">
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.file-label {
    margin: .5rem 0 0;
    display: inline-flex;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    column-gap: .5rem;
    align-items: center;

    h2 {
        display: inline-block;

    }

    .filename {
        font-size: 1.2rem;
        background-color: $main;
        padding: .5rem;
        border-radius: .5rem;
    }
}

.file-label:hover {
    cursor: pointer;
    opacity: .8;
}
</style>