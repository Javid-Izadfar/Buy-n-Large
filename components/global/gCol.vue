<template>
    <component :is="tag"
               :class="[
                   'col',
                   cols ? `col--${cols}` : ''
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
        cols: {
            type: [Number, String],
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
    .col {
        padding-left: $gutter;
        padding-right: $gutter;
        @include create-col();
        @for $i from 1 through $cols-count {
            &--#{$i} {
                @include create-col($i);
            }
        }
    }
</style>
