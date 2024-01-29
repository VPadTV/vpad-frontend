<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import { loadOrGetUserRef } from '@/composables/loadOrGetUser';
import UserHeader from '@/components/sections/UserHeader.vue';

const user = loadOrGetUserRef()
</script>

<template>
    <BaseHeaderSidebar v-if="user">
        <UserHeader :user="user">
            <h1>Dashboard</h1>
        </UserHeader>
        <section class="user-data">
            <h2>About me</h2>
            <p v-if="user.about" class="about">
                {{ user.about }}
            </p>
            <h2>My Posts</h2>
            <PostList />
        </section>
    </BaseHeaderSidebar>
    <div class="loading" v-else>
        <LoadingIcon></LoadingIcon>
    </div>
</template>

<style scoped lang="scss">
h1 {
    font-size: 2.5rem;
}

.user-data {
    padding: 0 3rem 3rem;

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