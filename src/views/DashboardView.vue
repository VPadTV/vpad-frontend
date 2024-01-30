<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import { loadOrGetUser } from '@/composables/loadOrGetUser';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import UserHeader from '@/components/sections/UserHeader.vue';
import { onBeforeMount, ref, toRaw, type Ref } from 'vue';
import type { User } from '@/types/entities';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import { updateUser } from '@/composables/api/user';
import XIcon from '@/components/icons/XIcon.vue';
import { useToast } from 'vue-toastification';

function checkEqual() {
    return JSON.stringify(toRaw(original.value)) !== JSON.stringify(toRaw(editedUser.value))
}
const original: Ref<User | undefined> = ref()
let editedUser: Ref<User | undefined> = ref()
onBeforeMount(async () => {
    original.value = await loadOrGetUser(true, '/')
    if (!editedUser.value && original.value)
        editedUser.value = { ...original.value }
})

async function saveClicked() {
    const response = await updateUser(original.value!.id!, {
        ...editedUser.value
    });
    if (response) {
        original.value = { ...editedUser.value! }
        const toast = useToast()
        toast.success('Saved')
    }
}
async function cancelClicked() {
    editedUser.value = { ...original.value! }
}

</script>

<template>
    <BaseHeaderSidebar v-if="editedUser">
        <UserHeader :user="editedUser">
            <h1>Dashboard</h1>
        </UserHeader>
        <section class="user-data">
            <section class="action-buttons">
                <button class="save" :class="{ disabled: !checkEqual() }" @click="saveClicked">
                    <span>Save</span>
                    <CheckIcon />
                </button>
                <button class="cancel" :class="{ disabled: !checkEqual() }" @click="cancelClicked">
                    <span>Cancel</span>
                    <XIcon />
                </button>
            </section>
            <TextInput v-model="editedUser.nickname">
                <h2>Nickname</h2>
            </TextInput>
            <TextInput v-model="editedUser.username">
                <h2>Username</h2>
            </TextInput>
            <TextAreaInput class="about" v-model="editedUser.about" min-width="100%">
                <h2>About</h2>
            </TextAreaInput>
            <h2>My Posts</h2>
            <PostList />
        </section>
    </BaseHeaderSidebar>
    <div class="loading" v-else>
        <LoadingIcon></LoadingIcon>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

h1 {
    font-size: 2.5rem;
}

.user-data {
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
            filter: none;
            cursor: default;
        }
    }

    .text-input {
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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
}
</style>