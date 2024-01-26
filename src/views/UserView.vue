<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeeUser from '@/components/sections/SeeUser.vue'
import type { User } from '@/types/entities';
import { get } from '@/composables/api/base'
import { type Ref, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

let user: Ref<User | undefined> = ref(undefined)

onMounted(async () => {
    const route = ref(useRoute())
    const userRaw = await get<User>('user', {
        id: route.value.params.userId as string
    })
    if (userRaw) {
        user.value = userRaw
    }
})
</script>


<template>
    <BaseHeaderSidebar>
        <SeeUser v-if="user" :user="user"/>
        <div v-else class="notfound">
            <LoadingSpinner/>
        </div>
        <UserList/>
    </BaseHeaderSidebar>
</template>

<style scoped lang="scss">
.notfound {
    margin: 2rem 4rem;
    width: 100%;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.users {
    margin-top: 1rem;
    margin: 0 4rem;
}
</style>