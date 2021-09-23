<template>
    <component :is="tag"
               :class="[
                   'row',
                   alignV ? `row--align-${alignV}` : '',
                   direction ? `row--dir-${direction}` : '',
                   justify ? `row--justify-${justify}` : '',
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
    // TODO: ADD VALIDATION
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
        justify: {
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
        &--justify {
            &-between {
                justify-content: space-between;
            }
        }
        &--align {
            &-center {
                align-items: center;
            }
            &-start {
                align-items: flex-start;
            }
            &-end {
                align-items: flex-end;
            }
        }
    }
</style>
