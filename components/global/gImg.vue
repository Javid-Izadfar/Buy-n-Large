<template>
    <img :src="src"
         :loading="lazy ? 'lazy' : 'eager'"
         :class="[
             'image',
             {
                 'image--dynamic-height': height > 0
             }
         ]"
         :style="height? `height: ${height}px`: ''">
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
        height: {
            type: [String, Number],
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        width: 100%;
        height: auto;
        display: block;
        &--dynamic-height {
            width: auto;
            margin: auto;
        }
    }
</style>
