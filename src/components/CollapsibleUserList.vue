<script setup lang="ts">
import { type User } from '@/types/entities'
import { onMounted, ref } from 'vue';
import UserProfilePicture from './UserProfilePicture.vue';
import CloseableComponent from './CloseableComponent.vue';
import ArrowIcon from './icons/ArrowIcon.vue';
import { boolify } from '@/utils';
const { title, users } = defineProps<{
    title: string,
    users: User[]
}>()

const closed = ref(false)

function toggleClosed() {
    closed.value = !closed.value;
    localStorage.setItem(`${title}-userListClosed`, closed.value.toString());
}

onMounted(async () => {
    const loadedClosed = boolify(localStorage.getItem(`${title}-userListClosed`));
    if (loadedClosed != null)
        closed.value = loadedClosed;
})

</script>

<template>
    <div>
        <button class="title" :onClick="toggleClosed">
            <h2>{{ title }}</h2>
            <span class="arrow" :class="{ closed }">
                <ArrowIcon/>
            </span>
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
@import '@/assets/style/base.scss';
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

    .arrow {
        height: 1.2rem;
        width: 1.2rem;
        rotate: 90deg;
    }

    .arrow.closed {
        rotate: -90deg;
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
        
        svg {
            width: 1lh;
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