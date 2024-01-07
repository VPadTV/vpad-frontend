<script setup lang="ts">
import { type User } from '@/lib/types'
import { ref } from 'vue';
defineProps<{
    title: string,
    users: User[]
}>()

const collapsed = ref(false)

</script>

<template>
    <div>
        <div>
            <button class="title" :onClick="() => collapsed = !collapsed">
                <h2>{{ title }}</h2><img :class="{ collapsed }" src="@/assets/arrow.png" alt="">
            </button>
        </div>
        <section :class="{ collapsed }">
            <RouterLink :to="`/user/${user.id}`" class="video" v-for="user in users" :key="user.id">
                <img src="@/assets/circle.png" alt="pfp">
                <span>{{ user.nickname }}</span>
            </RouterLink>
        </section>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';
div {
    overflow: hidden;
    width: 100%;
}

.title {
    height: 3rem;
    background: none;
    border: none;
    border-radius: 100%;
    padding: .5rem;
    transition: transform $sidebar-transition-time;

    color: $text;

    img {
        width: 1.1rem;
        vertical-align: middle;
        text-align: center;
        rotate: 90deg;
    }

    img.collapsed {
        transform: rotate(180deg);
    }

    :hover {
        cursor: pointer;
    }
}

h2 {
    text-align: center;
    vertical-align: middle;
    display: inline;
    margin-right: .5rem;
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
        color: $text;
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

section.collapsed {
    display: none;
}

</style>