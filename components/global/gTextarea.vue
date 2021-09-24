<template>
    <label :class="[
        'textarea',
        {
            'textarea--invalid': state === false
        },
    ]">
        <span class="textarea_label">
            <slot/>
        </span>
        <textarea v-model="model"
                  class="textarea_input"
                  :name="name"
                  :placeholder="placeholder"/>
    </label>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        state: {
            type: Boolean,
            default: undefined,
        },
        placeholder: {
            type: String,
            default: '',
        },
        formatter: {
            type: Function,
            default: (value) => value,
        },
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', this.formatter(value));
            },
        },
    },
};
</script>

<style lang="scss" scoped>
    .textarea {
        $self: &;
        &_label {
            font-size: $font-size-base;
            display: block;
            margin-bottom: $gutter * 0.5;
            margin-top: $gutter * 0.5;
        }
        &_input {
            border: solid 1px $mute;
            background-color: $box-bg;
            border-radius: $border-radius-base;
            padding: $gutter * 0.5 $gutter;
            margin-bottom: $gutter * 0.5;
            display: block;
            width: 100%;
            outline: none;
            resize: vertical;
            &:active,
            &:focus {
                border-color: $black;
            }
        }
        &--invalid {
            #{ $self }_input {
                border-color: $secondary;
            }
        }
    }
</style>
