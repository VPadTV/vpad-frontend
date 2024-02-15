<script setup lang="ts">
import type { UserComment } from '@/types/entities';
import UserProfilePicture from '@/components/UserProfilePicture.vue';
import { formatDate, formatNumber } from '@/utils';
import LikeIcon from '../icons/LikeIcon.vue';

const { comments } = defineProps<{
    comments: UserComment[],
}>()

const testDate = new Date()
const testLikes = 500
const testDislikes = 400
const testAuthor = { id: "a", nickname: "jon" }
</script>

<template>
    <ul class="comment-list">
        <li v-for="comment in comments" v-bind:key="comment.id">
            <details class="comment">
                <summary class="body">
                    <span class="body-text">{{ comment.body }}</span>
                    <section class="meta">
                        <aside class="left">
                            <RouterLink :to="`/user/${testAuthor.id}`" class="author">
                                <UserProfilePicture class="pfp" :id="testAuthor.id" />
                                <span>{{ testAuthor.nickname }}</span>
                            </RouterLink>
                            <p class="toggle-text"></p>
                        </aside>
                        <aside class="right">
                            <p class="date">{{ formatDate(testDate) }}</p>
                            <span class="votes">
                                <p class="likes">
                                    <span>{{ formatNumber(testLikes) }}</span>
                                    <LikeIcon class="like" />
                                </p>
                                <p class="dislikes">
                                    <span>{{ formatNumber(testDislikes) }}</span>
                                    <LikeIcon class="dislike" />
                                </p>
                            </span>
                        </aside>
                    </section>
                </summary>
                <CommentList v-if="comment.children.length > 0" :comments="comment.children" />
            </details>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@import '@/assets/style/base.scss';

ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.comment .toggle-text:hover {
    cursor: pointer;
}

.comment .toggle-text::after {
    color: $text-faded;
}

.comment[open] .toggle-text::after {
    content: "Click to Close";
}

.comment:not([open]) .toggle-text::after {
    content: "Click to Open";
}

li {
    list-style: none;
    margin: 0 .5rem;

    .body {
        list-style: none;

        .body-text {
            overflow-wrap: break-word;
        }

        .left {
            text-align: left;
        }

        .right {
            text-align: right;
        }

        .meta {
            margin-top: 5px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .author {
                font-size: 1.2rem;
                display: inline-flex;
                align-items: center;

                .pfp {
                    width: .8lh;
                    height: .8lh;
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

            .votes {
                display: flex;
                flex-direction: row;
                gap: .5rem;

                >* {
                    font-size: 1.4rem;
                    display: flex;
                    gap: .5rem;
                    align-items: center;
                    justify-content: flex-end;
                }


                .like,
                .dislike {
                    max-height: .8lh;
                }

                .like {
                    fill: $accent;
                    width: 24px;
                }

                .dislike {
                    width: 24px;
                    position: relative;
                    fill: $red;
                    rotate: 180deg;
                    transform: scaleX(-1);
                }
            }
        }
    }

    .comment-list {
        margin-top: 1rem;
        padding-bottom: 1rem;
    }
}

li {
    border-left: 2px solid $main-lighter;
    padding-left: 1rem;
}
</style>