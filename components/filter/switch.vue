<template>
    <div class="switch">
        <input v-model="isChecked"
               :id="filter.key"
               :disabled="isLoadingProducts"
               type="checkbox"
               class="switch_input">
        <label class="switch_label" :for="filter.key">
            {{ filter.title }}
        </label>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        filter: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState(['appliedFilters', 'isLoadingProducts']),
        isChecked: {
            get() {
                return this.appliedFilters[this.filter.key];
            },
            set(value) {
                this.setFilter({ item: this.filter.key, value });
            },
        },
    },
    methods: {
        ...mapMutations(['setFilter']),
    },
};
</script>

<style lang="scss" scoped>
    .switch {
        $toggler-width: 2rem;
        $toggler-height: 1rem;
        $self: &;
        &_label {
            display: inline-block;
            cursor: pointer;
            user-select: none;
            position: relative;
            padding-right: $toggler-width + ($gutter * 0.5);
            padding-left: $gutter * 0.5;
            line-height: $toggler-height;
            &:before,
            &:after {
                content: '';
                position: absolute;
                top: 0;
                height: $toggler-height;
                transition: all 200ms ease-in-out;
            }
            &:before {
                right: 0;
                width: $toggler-width;
                background: $filter-inactive;
                border-radius: $border-radius-lg;
            }
            &:after {
                right: 0;
                width: $toggler-height;
                border-radius: $border-radius-full;
                border: solid ($toggler-height * 0.2) $filter-inactive;
                box-sizing: border-box;
                background: $box-bg;
            }
        }
        &_input {
            display: none;
            &:checked {
                & + #{ $self }_label {
                    &:before {
                        background: $filter-active;
                    }
                    &:after {
                        border-color: $filter-active;
                        right: $toggler-width - $toggler-height;
                    }
                }
            }
            &:disabled {
                & + #{ $self }_label {
                    cursor: not-allowed;
                    opacity: 0.8;
                }
            }
        }
    }
</style>
