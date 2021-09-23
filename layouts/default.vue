<template>
    <div>
        <layout-header/>
        <div class="nuxt_wrapper">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
    .nuxt_wrapper {
        padding-top: $header-height + $gutter;
    }
</style>
