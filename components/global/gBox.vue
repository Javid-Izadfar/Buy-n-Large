<template>
    <div :class="[
        'box',
        {
            'box--0p': noPadding,
            'box--0m': noMargin
        }
    ]">
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        noPadding: {
            type: Boolean,
            default: false,
        },
        noMargin: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .box {
        overflow: hidden;
        padding: $gutter ($gutter * 2);
        margin-bottom: $gutter * 2;
        background: $box-bg;
        color: $box-txt;
        border-radius: $card-border-radius;
        box-shadow: 0 10px 30px rgba(50, 50, 93, 0.12),
                    0 -1px 4px rgba(0, 0, 0, 0.06);
        &--0p {
            padding: 0;
        }
        &--0m {
            margin: 0;
        }
    }
</style>
