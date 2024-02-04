<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue';
import LoadingPage from '@/components/sections/LoadingPage.vue';
import { loadOrGetUserRef } from '@/composables/loadOrGetUser';
import TextAreaInput from '@/components/forms/TextAreaInputField.vue';
import InputField from '@/components/forms/InputField.vue';
import UserHeader from '@/components/sections/UserHeader.vue';
import { ref, toRaw, watchEffect } from 'vue';
import type { User } from '@/types/entities';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import { UserAPI } from '@/composables/api/user';
import XIcon from '@/components/icons/XIcon.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { store } from '@/store/store';

function checkEqual() {
    return JSON.stringify(toRaw(original.value)) !== JSON.stringify(toRaw(editedUser.value))
}

async function saveClicked() {
    const response = await UserAPI.update(original.value!.id!, {
        ...editedUser.value
    });
    if (response) {
        original.value = { ...editedUser.value! }
        store.user = original.value
        const toast = useToast()
        toast.success('Saved')
    }
}
async function cancelClicked() {
    editedUser.value = { ...original.value! }
}

const original = loadOrGetUserRef(useRouter())
let editedUser = ref<User | undefined>()

watchEffect(() => {
    if (original.value)
        editedUser.value = { ...original.value }
})
</script>

<template>
    <BaseHeaderSidebar v-if="editedUser">
        <UserHeader :user="editedUser">
            <h1>Dashboard</h1>
        </UserHeader>
        <form>
            <section class="action-buttons">
                <button class="save" :class="{ disabled: !checkEqual() }" @click.prevent="saveClicked">
                    <span>Save</span>
                    <CheckIcon />
                </button>
                <button class="cancel" :class="{ disabled: !checkEqual() }" @click.prevent="cancelClicked">
                    <span>Cancel</span>
                    <XIcon />
                </button>
            </section>
            <InputField v-model="editedUser.nickname">
                <h2>Nickname</h2>
            </InputField>
            <InputField v-model="editedUser.username">
                <h2>Username</h2>
            </InputField>
            <TextAreaInput class="about" v-model="editedUser.about" min-width="100%">
                <h2>About</h2>
            </TextAreaInput>
            <h2>My Posts</h2>
            <PostList v-if="original" :filter="{ creatorId: original.id }" />
        </form>
    </BaseHeaderSidebar>
    <LoadingPage v-else />
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

h1 {
    font-size: 2.5rem;
}

form {
    margin: 1rem 0 0;
    padding: 0 3rem 3rem;

    .action-buttons {
        display: flex;
        flex-direction: row;
        column-gap: .5rem;

        button {
            padding: .3rem .5rem;
            border-radius: .5rem;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: .2rem;
            font-size: 1rem;
            transition: background-color .1s, border-color .1s;

            svg {
                height: 1.3rem;
            }
        }

        .save {
            background-color: $accent;
            border-color: $accent
        }

        .cancel {
            background-color: $light-red;
            border-color: $light-red;
        }

        button.disabled {
            background-color: transparent;
            border-color: $main;
        }

        button.disabled:hover {
            opacity: 1;
            cursor: default;
        }
    }

    .input-field {
        max-width: 80%;
    }

    h2 {
        font-size: 1.6rem;
    }

    p {
        margin-top: .2rem;
        font-size: 1.2rem;
    }

    .posts {
        margin-top: 1rem;
    }
}

@media screen and (max-width: $mobile-width-large) {
    form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;

        .action-buttons {
            button {
                padding: .6rem 1rem;
            }

            justify-content: center;
        }

        .input-field,
        .file-field {
            width: 100%;
            max-width: 100%;
        }
    }

    .radio-field {
        max-width: unset;
        width: unset;
    }
}
</style>