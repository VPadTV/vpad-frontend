<script setup lang="ts">
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import { ref } from 'vue';
import type { Post } from '@/types/entities';

const { post, postScale } = defineProps<{
    post: Post,
    postScale: number
}>()

let loading = ref(true)
function hideLoading() {
    loading.value = false
}

</script>

<template>
    <section class="post">
        <section class="content-background">
            <LoadingIcon :class="{ hidden: !loading }"/>
            <img :class="{ hidden: loading }" @load="hideLoading()" :src="post.url" class="content" :style="{ width: `${postScale}%` }"/>
        </section>
        <p class="text">
            <span class="title">{{ post?.title }}</span>
            <RouterLink :to="`/user/${post.author.id}`" class="author">
                <UserProfilePicture class="pfp" :id="post.author.id" />
                <span>{{ post.author.nickname }}</span>
            </RouterLink>
            <span class="date">{{ post.createdAt.toLocaleDateString() }}</span>
        </p>
    </section>
</template> 
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';
.content-background {
    width: 100%;
    background-color: $main;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        max-width: 100%;
        min-width: 30%;

        img {
            width: 100%;
            text-align: center;
        }
    }
    }

.loading-spinner {
    padding: 1rem;
}

.text {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title, .author {
        margin-bottom: .2rem;
    }

    .title {
        margin-top: .3rem;
        font-size: 1.4rem;
    }

    .author {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        .pfp {
            width: .9lh;
            height: .9lh;
            vertical-align: middle;
            margin-right: .4rem;
        }
        span {
            height: 1lh;
            vertical-align: middle;
            display: inline-block;
        }
    }
    
    .date {
        color: $text-faded;
    }

* {
    text-align: left;
    overflow: hidden;
    max-height: 2lh;    
    max-width: 100%;
}
}

@media screen and (max-width: $mobile-width-large) {
    .content-background {
        max-height: 700px;
        overflow: hidden;
    }
    .content {
        width: 100%!important;
    }

    .post {
        .text {
            margin: 0rem 1rem 1rem;
        }
    }
}
</style>
