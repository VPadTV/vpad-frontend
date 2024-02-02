<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import PostList from '@/components/sections/PostList.vue';
import LoadingPage from '@/components/sections/LoadingPage.vue';
import UserHeader from '@/components/sections/UserHeader.vue';
import { onBeforeMount, ref } from 'vue';
import type { User } from '@/types/entities';
import { getUser } from '@/composables/api/user';
import { useRoute } from 'vue-router';
const route = useRoute()

const user = ref<User | undefined>()
onBeforeMount(async () => {
    const id = route.params.userId
    if (id && typeof id === 'string')
        user.value = await getUser(id)
})
</script>

<template>
    <BaseHeaderSidebar v-if="user">
        <UserHeader :user="user" />
        <section class="user-data">
            <h2>About</h2>
            <p v-if="user.about" class="about">
                {{ user.about }}
            </p>
            <h2>My Posts</h2>
            <PostList />
        </section>
    </BaseHeaderSidebar>
    <LoadingPage v-else />
</template>

<style scoped lang="scss">
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
</style>