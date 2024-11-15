<script setup lang="ts">
import { ref } from 'vue'
import TrashIcon from '@shared/components/TrashIcon'
import type { FileFieldPreviewProps } from '.'

const model = defineModel<File>({})
const { name } = defineProps<FileFieldPreviewProps>()

const finput = ref()
const previewUrl = ref<string | undefined>()

const cancelFile = () => {
  finput.value.value = ''
  previewUrl.value = undefined
  model.value = undefined
}

const fileChanged = (ev: Event) => {
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
          <TrashIcon />
        </button>
        <img v-if="previewUrl" :src="previewUrl" />
        <span v-else>
          <slot></slot>
        </span>
      </div>
    </label>
    <input
      :required="required"
      accept="image/*,video/*"
      ref="finput"
      class="hidden"
      :name="name"
      :id="name"
      type="file"
      @change="fileChanged"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@assets/style/base.scss';

.media-input {
  padding: 0.5rem;
  width: 100%;
  min-height: 200px;
  background-color: $main;
  border-radius: 0.5rem;

  display: grid;
  grid-template: auto / auto;
  align-items: center;
  justify-items: center;

  > * {
    grid-column-start: 1;
    grid-row-start: 1;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  span {
    border: 2px solid $accent;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
}

.rm-image {
  z-index: 1;
  height: 2rem;
  width: 2rem;
  background-color: $light-red;
  border-radius: 100%;
  border: 0;
  opacity: 0.6;
  margin: 1rem;
  align-self: flex-start;
  justify-self: flex-end;
  padding: 4px;

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
  margin: 0.5rem 0 0;
  display: inline-flex;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  column-gap: 0.5rem;
  align-items: center;

  h2 {
    display: inline-block;
  }

  .filename {
    font-size: 1.2rem;
    background-color: $main;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
}

.file-label:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
