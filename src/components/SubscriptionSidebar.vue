<script setup lang="ts">
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
    <aside>
        <h2>Subscriptions</h2>
        <section class="sub">
            <RouterLink :to="`/user/${author.id}`" class="video" v-for="author in authors" :key="author.id">
                <img src="@/assets/circle.png" alt="sex">
                <span>{{ author.author }}</span>
            </RouterLink>
        </section>
        <h2>Follows</h2>
        <section class="follow">
            <RouterLink :to="`/user/${author.id}`" class="video" v-for="author in authors" :key="author.id">
                <img src="@/assets/circle.png" alt="sex">
                <span>{{ author.author }}</span>
            </RouterLink>
        </section>
    </aside>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

aside {
    background-color: $main;
    width: $sidebar-width;
    transition: transform $sidebar-transition-time;
    padding: 1rem 1rem 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
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
        row-gap: 10px;
        width: 100%;

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

    h2 {
        text-align: center;
        vertical-align: middle;
        margin: .8rem 0 .6rem;
    }
    
}

</style>
