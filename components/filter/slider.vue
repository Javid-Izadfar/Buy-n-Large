<template>
    <div :class="[
        'range',
        {
            'range--price': isPrice
        }
    ]">
        <label class="range_label">{{ filter.title }}</label>
        <client-only>
            <vue-range
                v-model="selectedRange"
                :height="4"
                :dot-size="16"
                :speed="0.2"
                :lazy="true"
                :reverse="true"
                :min="filter.options.min"
                :max="filter.options.max"
                :disabled="isLoadingProducts"
                :formatter="formatter"
                @slide-end="fetchProducts"
                class="range_input"
                tooltip-dir="top"/>
        </client-only>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { addCommas, toFarsiDigits } from '~/scripts/utils/string';

export default {
    props: {
        filter: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState(['appliedFilters', 'isLoadingProducts']),
        selectedRange: {
            get() {
                return [
                    Math.max(this.appliedFilters[`${this.filter.key}[min]`] || this.filter.options.min, this.filter.options.min),
                    Math.min(this.appliedFilters[`${this.filter.key}[max]`] || this.filter.options.max, this.filter.options.max),
                ];
            },
            set(value) {
                this.setFilter({ item: `${this.filter.key}[min]`, value: value[0] });
                this.setFilter({ item: `${this.filter.key}[max]`, value: value[1] });
            },
        },
        isPrice() {
            return this.filter.title.includes('قیمت');
        },
    },
    methods: {
        ...mapMutations(['setFilter']),
        ...mapActions(['fetchProducts']),
        formatter(value) {
            if (this.isPrice) {
                return `${toFarsiDigits(addCommas(Math.floor(value / 10)))} ت`;
            } else {
                return toFarsiDigits(addCommas(value));
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .range {
        &_label {
            display: block;
        }
        &_input {
            margin-top: $gutter * 2;
            /deep/ .slider {
                background-color: $filter-inactive;
                &-process {
                    background-color: $filter-active !important;
                }
                &-dot-handle {
                    box-shadow: none !important;
                    border: solid 0.2rem $filter-inactive;
                }
                &-tooltip {
                    background-color: $filter-active !important;
                    border: $filter-active !important;
                }
            }
        }
    }
</style>
