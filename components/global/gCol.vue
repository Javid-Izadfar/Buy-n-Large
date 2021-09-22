<template>
    <component :is="tag"
               :class="[
                   'col',
                   cols ? `col--${cols}c` : '',
                   order ? `col--${order}o` : '',
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
        order: {
            type: [Number, String],
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
    .col {
        @include create-col();
        @for $i from 1 through $cols-count {
            &--#{$i}c {
                @include create-col($i);
            }
        }
        @for $i from 1 through 5 {
            &--#{$i}o {
                order: $i;
            }
        }
    }
</style>
