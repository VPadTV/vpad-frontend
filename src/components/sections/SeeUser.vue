<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import type { User } from '@/types/entities';

const { user } = defineProps<{
    user: User
}>()

</script>

<template>
    <section class="user">
        <p class="details">
            <RouterLink :to="`/user/${user.id}`" class="identity">
                <UserProfilePicture :id="user.id" />
                <span class="name">{{ user.nickname }}</span>
            </RouterLink>
        </p>
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/base.scss';
.user {
    margin: 1rem 4rem;
}

.details {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .identity {
        font-size: 1.5rem;
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
}
</style>
