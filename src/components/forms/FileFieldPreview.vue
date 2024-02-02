<script setup lang="ts">
import { ref, type VNodeRef } from 'vue';
import XIcon from '@/components/icons/XIcon.vue'

const model = defineModel<File>({});
const { name } = defineProps<{
    name: string,
    inputRef?: VNodeRef,
    required?: boolean
}>();

const finput = ref()
let previewUrl = ref<string | undefined>();

function cancelFile() {
    finput.value.value = ''
    previewUrl.value = undefined
    model.value = undefined
}

function fileChanged(ev: Event) {
    const files = (ev.target as HTMLInputElement)?.files
    if (files && files.length > 0) {
        const file = files.item(0)!
        model.value = file
        previewUrl.value = URL.createObjectURL(file)
    }
}

</script>

<template>
    <div class="file-field">
        <label class="file-label" :for="name">
            <div class="media-input">
                <button v-if="model?.name" @click.prevent="cancelFile" class="rm-image">
                    <XIcon />
                </button>
                <img v-if="previewUrl" :src="previewUrl" />
                <span v-else>
                    <slot></slot>
                </span>
            </div>
        </label>
        <input :required="required" accept="image/*,video/*" ref="finput" class="hidden" :name="name" :id="name" type="file"
            @change="fileChanged">
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

.media-input {

    padding: .5rem;
    width: 100%;
    min-height: 200px;
    background-color: $main;
    border-radius: .5rem;

    display: grid;
    grid-template: 1fr / 1fr;
    align-items: center;
    justify-items: center;

    >* {
        grid-column-start: 1;
        grid-row-start: 1;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    span {
        border: 2px solid $accent;
        border-radius: .5rem;
        padding: .5rem;
    }
}

.rm-image {
    z-index: 1;
    height: 3rem;
    width: 3rem;
    background-color: $light-red;
    border-radius: 100%;
    border: 0;
    opacity: .2;
    justify-self: flex-start;

    svg {
        vertical-align: middle;
        height: unset;
    }
}

.rm-image:hover {
    opacity: 1;
}

.file-label {
    width: 100%;
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