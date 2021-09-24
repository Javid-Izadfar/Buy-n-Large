<template>
    <label :class="[
        'input',
        {
            'input--invalid': state === false
        },
    ]">
        <span class="input_label">
            <slot/>
        </span>
        <input v-model="model"
               class="input_input"
               :type="type"
               :name="name"
               :placeholder="placeholder">
    </label>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
            validator: (value) => ['text', 'number'].indexOf(value) !== -1,
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
    .input {
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
            &::-webkit-search-decoration,
            &::-webkit-search-cancel-button,
            &::-webkit-search-results-button,
            &::-webkit-search-results-decoration {
                display: none;
            }
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
