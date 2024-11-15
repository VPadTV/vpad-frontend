<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { UserRepository } from '../../../infrastructure/repositories/User/user';
const route = useRoute()

const user = ref<unknown | undefined>()
onBeforeMount(async () => {
    const id = route.params.userId
    if (id && typeof id === 'string') user.value = await UserRepository.get(id)
})
</script>

<template>
    <h1>Not Implemented</h1>
</template>

<style scoped lang="scss"></style>
