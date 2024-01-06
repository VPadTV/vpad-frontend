<script setup lang="ts">
defineProps<{
    sidebarClosed: boolean
}>()

import { onMounted, ref, type Ref } from 'vue';
import HorizontalLine from './HorizontalLine.vue';
import { get } from '@/lib/api';

export type Author = { id: number, author: string }

let authors: Ref<Author[] | null> = ref(null)

onMounted(async () => {
    authors.value = await get<Author[]>('url', {})
})

</script>

<template>
    <aside :class="{ collapsed: sidebarClosed }">
        <h2>Subscriptions</h2>
        <section>
            <RouterLink :to="`/user/${author.id}`" class="video" v-for="author in authors" :key="author.id">
                {{ author.author }}
            </RouterLink>
        </section>
        <HorizontalLine/>
        <h2>Follows</h2>
        <section>
            <RouterLink :to="`/user/${author.id}`" class="video" v-for="author in authors" :key="author.id">
                {{ author.author }}
            </RouterLink>
        </section>
    </aside>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

aside {
    background-color: $main;
    height: 100%;
    width: $sidebar-width;
    transition: transform $sidebar-transition-time;
    padding: 1rem 1rem 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;

    * {
        flex-shrink: 0;
    }

    div {
        margin: 10px 0;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        a {
            color: $text;
        }
    }

    h2 {
        text-align: center;
        vertical-align: middle;
    }
}

aside.collapsed {
    transform: translate(-100%);
}
</style>
