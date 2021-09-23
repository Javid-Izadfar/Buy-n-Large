<template>
    <div :class="[
        'badge',
        `badge--${variant}`
    ]">
        <g-row no-gutters align-v="center">
            <component v-if="icon" :is="`icons-${icon}`" size="24"/>
            <span class="m-left-1 m-right-1">
                <slot/>
            </span>
        </g-row>
    </div>
</template>

<script>
export default {
    props: {
        variant: {
            type: String,
            default: 'primary',
        },
        icon: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge {
        user-select: none;
        display: inline-block;
        padding: ($gutter * 0.25) ($gutter * 0.3);
        border-radius: $border-radius-xl;
        font-size: $font-size-sm;
        font-weight: $font-weight-light;
        line-height: 1.5;
        &--primary {
            background: $primary;
            color: $white;
        }
        &--secondary {
            background: $secondary;
            color: $white;
        }
        &--success {
            background: $success;
            color: $white;
        }
    }
</style>
