<template>
    <component :is="tag"
               :class="[
                   'container',
                   {
                       'container--fluid': fluid
                   }
               ]">
        <slot/>
    </component>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        fluid: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
        max-width: 100%;
        &--fluid {
            width: 100%;
        }
    }
</style>
