<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';

import { onMounted, ref, type Ref } from 'vue';
import { get } from '@/composables/api/base'
import type { User } from '@/types/entities';

const { id } = defineProps<{
    id: string
}>()

let user: Ref<User | undefined> = ref(undefined)

onMounted(async () => {
    const userRaw = await get<User>('user', { id })
    if (userRaw)
        user.value = userRaw
})

</script>

<template>
    <section v-if="user" class="user">
        <p class="text">
            <span class="name">{{ user.nickname }}</span>
            <RouterLink :to="`/user/${user.id}`" class="author">
                <UserProfilePicture :id="user.id" />
                <span>{{ user.nickname }}</span>
            </RouterLink>
        </p>
    </section>
    <section v-else class="no-user">
        Sadge
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/base.scss';
.user {
    margin: 1rem 4rem;
}

.text {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .name, .author {
        margin-bottom: .2rem;
    }

    .name {
        font-size: 1.4rem;
    }

    .author {
        font-size: 1.2rem;
        img {
            height: 1lh;
            vertical-align: middle;
            margin-right: .3rem;
        }
        span {
            height: 1lh;
            vertical-align: middle;
            display: inline-block;
        }
    }

    * {
        text-align: left;
        overflow: hidden;
        max-height: 2lh;    
        max-width: 100%;
    }
}
</style>
