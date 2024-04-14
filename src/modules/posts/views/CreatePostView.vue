<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import { loadOrGetUserRef } from '@/composables/loadOrGetUser'
import TextAreaInput from '@/components/forms/TextAreaInputField.vue'
import InputField from '@/components/forms/InputField.vue'
import RadioField from '@/components/forms/RadioField.vue'
import LoadingPage from '@/components/sections/LoadingPage.vue'
import UserHeader from '@/components/sections/UserHeader.vue'
import { ref } from 'vue'
import FileFieldPreview from '@/components/forms/FileFieldPreview.vue'
import RequiredStar from '@/components/RequiredStar.vue'
import { PostAPI } from '@/composables/api/post'
import { useToast } from 'vue-toastification'
import router from '@/router'
import { useRouter } from 'vue-router'

const user = loadOrGetUserRef(useRouter())
let form = ref<HTMLFormElement>()
let formBody = ref<{
  title: string
  text: string
  media?: File
  thumb?: File
  nsfw: boolean
  tags: string
}>({
  title: '',
  text: '',
  nsfw: false,
  tags: ''
})

async function createClicked() {
  const toast = useToast()
  if (!form.value?.checkValidity()) {
    form.value?.reportValidity()
    toast.error('Missing required fields')
    return
  }
  const response = await PostAPI.create({ ...(formBody.value as any) })
  if (response) {
    toast.success('Post created!')
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <BaseHeaderSidebar v-if="user">
    <UserHeader :user="user" subtitle="Create Post" />
    <form ref="form">
      <InputField required name="title" v-model="formBody.title">
        <h2><RequiredStar />Title</h2>
      </InputField>
      <FileFieldPreview required name="media" v-model="formBody.media">
        <RequiredStar />Drop your file here
      </FileFieldPreview>
      <FileFieldPreview name="thumb" v-model="formBody.thumb">
        Drop your thumbnail here
      </FileFieldPreview>
      <TextAreaInput required name="text" v-model="formBody.text" min-width="100%">
        <h2><RequiredStar />Text</h2>
      </TextAreaInput>
      <InputField required name="tags" v-model="formBody.tags">
        <h2><RequiredStar />Tags (separated by commas)</h2>
      </InputField>
      <RadioField name="nsfw" v-model="formBody.nsfw">
        <h2>NSFW?</h2>
      </RadioField>
      <button class="save" @click.prevent="createClicked">
        <span>Create Post</span>
      </button>
    </form>
  </BaseHeaderSidebar>
  <LoadingPage v-else />
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

h1 {
  font-size: 2.5rem;
}

.save {
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  column-gap: 0.2rem;
  font-size: 1rem;
  transition:
    background-color 0.1s,
    border-color 0.1s;
  background-color: $accent;

  border-color: $accent;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0 3rem;
  row-gap: 0.5rem;

  > * {
    max-width: 50rem;
    width: 80%;
  }
}

h2 {
  font-size: 1.6rem;
}

@media screen and (max-width: $mobile-width-large) {
  form {
    align-items: stretch;

    > * {
      width: unset;
    }
  }

  .radio-field {
    max-width: unset;
    width: unset;
  }
}
</style>
