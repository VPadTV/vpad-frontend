<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import UserProfilePicture from '@/components/UserProfilePicture.vue'
import { getUserAuth } from '@/composables/api/auth';
import { onBeforeMount, ref } from 'vue';
import type { User } from '@/types/entities';
import { getUser } from '@/composables/api/user';
import PostList from '@/components/sections/PostList.vue';

const userAuth = getUserAuth()
const user = ref<User | undefined>(undefined)

onBeforeMount(async () => {
    if (!userAuth) return;
    user.value = await getUser(userAuth?.id)
})
</script>

<template>
    <BaseHeaderSidebar v-if="user">
        <header>
            <div class="identity">
                <UserProfilePicture :pfpUrl="user.profilePhotoUrl"></UserProfilePicture>
                <h1>
                    <span>{{ user.nickname }}</span>
                    <small>{{ user.username }}</small>
                </h1>
            </div>
        </header>
        <section>
            <p v-if="user.about" class="about">
                {{ user.about }}
            </p>
        </section>
        <PostList />
    </BaseHeaderSidebar>
    <h2 v-else>Oops! This page doesn't exist</h2>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

header {
    padding: 3rem;
    border-bottom: 5px solid $main;
    margin: 0 0 1rem;

    div {
        display: flex;
        align-items: center;
        column-gap: .6rem;
        height: 4.5rem;
        vertical-align: middle;

        svg {
            width: unset;
        }

        h1 {
            font-size: 2rem;

            small {
                display: block;
                font-size: 1.2rem;
                color: $text-faded;
            }
        }
    }
}

section {
    padding: 0 3rem 3rem;
}

h2 {
    margin: 3rem;
    text-align: center;
}

p {
    font-size: 1.2rem;
}
</style>