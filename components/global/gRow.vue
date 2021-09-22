<template>
    <component :is="tag"
               :class="[
                   'row',
                   alignV ? `row--align-${alignV}` : '',
                   direction ? `row--dir-${direction}` : '',
                   {
                       'row--0g': noGutters,
                       'row--hg': halfGutters,
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
        halfGutters: {
            type: Boolean,
            default: false,
        },
        alignV: {
            type: String,
            default: '',
        },
        direction: {
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
        @include create-row()
        &--0g {
            @include create-row(0)
        }
        &--hg {
            @include create-row($gutter * 0.5)
        }
        &--dir {
            &-column {
                flex-direction: column;
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
