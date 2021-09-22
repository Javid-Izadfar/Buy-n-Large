<template>
    <div :class="[
        'box',
        {
            'box--0p': noPadding
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
    },
};
</script>

<style lang="scss" scoped>
    .box {
        overflow: hidden;
        padding: 1rem 2rem;
        background: $card-bg;
        border-radius: $card-border-radius;
        box-shadow: 0 10px 30px rgba(50, 50, 93, 0.12),
                    0 -1px 4px rgba(0, 0, 0, 0.06);
        &--0p {
            padding: 0;
        }
    }
</style>
