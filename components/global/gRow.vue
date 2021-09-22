<template>
    <component :is="tag"
               :class="[
                   'row',
                   alignV ? `row--align-${alignV}` : '',
                   {
                       'row--0g': noGutters
                   },
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
        noGutters: {
            type: Boolean,
            default: false,
        },
        alignV: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: $gutter * -1;
        margin-left: $gutter * -1;
        &--0g {
            margin-right: 0;
            margin-left: 0;
            & > .col {
                padding-right: 0;
                padding-left: 0;
            }
        }
        &--align {
            &-center {
                align-items: center;
            }
            &-start {
                align-content: flex-start;
            }
            &-end {
                align-content: flex-end;
            }
        }
    }
</style>
