<script setup lang="ts">
import BaseHeaderSidebar from '@/views/base/HeaderSidebar.vue'
import SeeUser from '@/components/sections/SeeUser.vue'

</script>


<template>
    <BaseHeaderSidebar>
        <SeeUser :id="($route.params.userId as string)"/>
    </BaseHeaderSidebar>
</template>

<style lang="scss">
</style>