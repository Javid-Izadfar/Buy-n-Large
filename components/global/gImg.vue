<template>
    <img :src="src" :loading="lazy ? 'lazy' : 'eager'">
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: '',
        },
        lazy: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: auto;
        display: block;
    }
</style>
