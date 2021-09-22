<template>
    <div class="search">
        <label class="search_label">
            {{ filter.title }}
        </label>
        <div class="search_input_wrapper">
            <input v-model="term"
                   :disabled="isLoadingProducts"
                   type="search"
                   placeholder="شروع به تایپ کنید"
                   class="search_input">
            <div class="search_icon">
                <icons-search/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import debounce from 'lodash.debounce';

export default {
    props: {
        filter: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState(['appliedFilters', 'isLoadingProducts']),
        term: {
            get() {
                return this.appliedFilters[this.filter.key];
            },
            set(value) {
                this.setFilter({
                    item: this.filter.key,
                    value: value || undefined,
                });
            },
        },
    },
    watch: {
        term: {
            handler: debounce(function() {
                if (!this.isLoadingProducts) {
                    this.fetchProducts();
                }
            }, 500),
        },
    },
    methods: {
        ...mapMutations(['setFilter']),
        ...mapActions(['fetchProducts']),
    },
};
</script>

<style lang="scss" scoped>
    .search {
        $self: &;
        &_input {
            display: block;
            font-size: $font-size-sm;
            border: solid 1px $filter-inactive;
            font-family: $font-family;
            background-color: $box-bg;
            border-radius: $border-radius-base;
            width: 100%;
            margin-top: 1rem;
            padding: 0.5rem 2.5rem 0.5rem 1rem;
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
                & + #{ $self }_icon {
                    opacity: 1;
                }
            }
            &_wrapper {
                position: relative;
            }
        }
        &_icon {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            opacity: 0.5;
            transition: opacity 200ms ease-in-out;
        }
    }
</style>
