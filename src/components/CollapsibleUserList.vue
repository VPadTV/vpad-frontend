<script setup lang="ts">
import { type User } from '@/types/entities'
import { ref } from 'vue';
import UserProfilePicture from './UserProfilePicture.vue';
import CloseableComponent from './CloseableComponent.vue';
defineProps<{
    title: string,
    users: User[]
}>()

const closed = ref(false)

</script>

<template>
    <div>
        <button class="title" :onClick="() => closed = !closed">
            <h2>{{ title }}</h2><img :class="{ closed }" src="@/assets/arrow.png" alt="">
        </button>
        <CloseableComponent :closed="closed">
            <section>
                <RouterLink :to="`/user/${user.id}`" v-for="user in users" :key="user.id">
                    <UserProfilePicture :id="user.id"/>
                    <span>{{ user.nickname }}</span>
                </RouterLink>
            </section>
        </CloseableComponent>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';
div {
    overflow: hidden;
    width: 100%;
}

.title:hover {
    cursor: pointer;
}

.title {
    padding: 0;
    background: none;
    border: none;
    vertical-align: middle;
    transition: transform $sidebar-transition-time;
    margin: 0 0 1rem;
    width: 100%;
    height: 1.5rem;

    display: inline-flex;
    justify-content: space-between;

    h2 {
        vertical-align: middle;
        display: inline;
    }

    img {
        height: 100%;
        vertical-align: middle;
        text-align: center;
        rotate: 90deg;
    }

    img.closed {
        transform: rotate(180deg);
    }
}

section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    width: 100%;
    transition: transform $sidebar-transition-time;

    a {
        border: 1px solid $main-light;
        padding: .6rem;
        width: 100%;
        
        img {
            height: 1lh;
            vertical-align: middle;
            margin-right: .6rem;
        }

        span {
            vertical-align: middle;
        }
    }
}

</style>