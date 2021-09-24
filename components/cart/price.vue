<template>
    <div :class="[
        'cartPrice',
        {
            'cartPrice--border-top': borderTop,
            'cartPrice--border-bottom': borderBottom,
        }
    ]">
        <g-row>
            <g-col>
                <slot/>:
            </g-col>
            <g-col class="text-left">
                <strong>{{ amount | toman }}</strong> تومان
            </g-col>
        </g-row>
    </div>
</template>

<script>
export default {
    props: {
        amount: {
            type: [Number, String],
            default: 0,
        },
        borderTop: {
            type: Boolean,
            default: false,
        },
        borderBottom: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .cartPrice {
        font-size: $font-size-lg;
        padding: $gutter 0;
        color: lighten($black, 60);
        strong {
            color: lighten($black, 40);
        }
        &--border {
            &-top {
                border-top: solid 1px lighten($black, 80);
            }
            &-bottom {
                border-bottom: solid 1px lighten($black, 80);
            }
        }
    }
</style>
