<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import { loadOrGetUserRef } from '@/composables/loadOrGetUser';
import TextAreaInput from '@/components/forms/TextAreaInputField.vue';
import InputField from '@/components/forms/InputField.vue';
import RadioField from '@/components/forms/RadioField.vue';
import LoadingPage from '@/components/sections/LoadingPage.vue';
import UserHeader from '@/components/sections/UserHeader.vue';
import { ref, toRaw } from 'vue';
import FileFieldPreview from '@/components/forms/FileFieldPreview.vue';
import RequiredStar from '@/components/RequiredStar.vue';
import { createPost } from '@/composables/api/post';
import { useToast } from 'vue-toastification';

const user = loadOrGetUserRef()

let formBody = ref<{
    title: string,
    text: string,
    media?: File,
    thumb?: File,
    nsfw: boolean,
    tags: string[]
}>({
    title: "",
    text: "",
    nsfw: false,
    tags: [],
})

async function createClicked(e: Event) {
    const toast = useToast()
    if (!formBody.value.media) return;
    const response = await createPost({ ...formBody.value as any, tags: "sometag" })
    if (response)
        toast.success('Post created!')
}

</script>

<template>
    <BaseHeaderSidebar v-if="user">
        <UserHeader :user="user">
            <h1>Create Post</h1>
        </UserHeader>
        <form>
            <InputField name="title" v-model="formBody.title">
                <h2>
                    <RequiredStar />Title
                </h2>
            </InputField>
            <FileFieldPreview name="media" v-model="formBody.media">
                <RequiredStar />Drop your file here
            </FileFieldPreview>
            <FileFieldPreview name="thumb" v-model="formBody.thumb">
                Drop your thumbnail here
            </FileFieldPreview>
            <TextAreaInput name="text" v-model="formBody.text" min-width="100%">
                <h2>
                    <RequiredStar />Text
                </h2>
            </TextAreaInput>
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
    padding: .3rem .5rem;
    border-radius: .5rem;
    border: 2px solid transparent;
    column-gap: .2rem;
    font-size: 1rem;
    transition: background-color .1s, border-color .1s;
    background-color: $accent;

    border-color: $accent;
}

form {
    padding: 0 3rem;
}

.input-field {
    max-width: 80%;
}

h2 {
    font-size: 1.6rem;
}

@media screen and (max-width: $mobile-width-large) {
    form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .input-field,
    .file-field {
        max-width: 100%;
        width: 100%;
    }

    .radio-field {
        max-width: unset;
        width: unset;
    }
}
</style>