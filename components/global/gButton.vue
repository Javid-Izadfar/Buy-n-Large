<template>
    <component :is="to ? 'NuxtLink' : 'button'"
               :to="to"
               :event="disabled ? '' : 'click'"
               :disabled="disabled"
               :class="[
                   'button',
                   `button--${variant}`,
                   {
                       'button--block': isBlock,
                       'button--disabled': disabled
                   }
               ]"
               @click="$emit('click')">
        <slot/>
    </component>
</template>

<script>
export default {
    props: {
        to: {
            type: Object,
            default: () => (null),
        },
        variant: {
            type: String,
            default: 'primary',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        disabled() {
            return this.isLoading || this.isDisabled;
        },
    },
};
</script>

<style lang="scss" scoped>
    .button {
        @include create-button();
        @include create-button-var();
        &--block {
            padding-right: 0;
            padding-left: 0;
            text-align: center;
            width: 100%;
            display: block;
        }
        &--primary {
            @include create-button-var($primary, $white)
        }
        &--secondary {
            @include create-button-var($secondary, $white)
        }
        &--accent {
            @include create-button-var($accent, $white)
        }
    }
</style>
