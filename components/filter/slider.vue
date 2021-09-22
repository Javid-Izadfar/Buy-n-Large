<template>
    <div class="range">
        <label class="range_label">{{ filter.title }}</label>
        <client-only>
            <vue-range
                v-model="selectedRange"
                :height="4"
                :dot-size="16"
                :speed="0.2"
                :lazy="true"
                :tooltip="isPrice ? false : 'always'"
                :reverse="true"
                :min="filter.options.min"
                :max="filter.options.max"
                :disabled="isLoadingProducts"
                :formatter="formatter"
                class="range_input"
                tooltip-dir="bottom"/>
        </client-only>
        <g-row v-if="isPrice" class="text-center small">
            <g-col cols="9">
                از
                <div class="range_price">
                    {{ selectedRange[0] | toman }}
                </div>
                تومان
            </g-col>
            <g-col cols="9">
                تا
                <div class="range_price">
                    {{ selectedRange[1] | toman }}
                </div>
                تومان
            </g-col>
        </g-row>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
                    this.appliedFilters[`${this.filter.key}[min]`] || this.filter.options.min,
                    this.appliedFilters[`${this.filter.key}[max]`] || this.filter.options.max,
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
        formatter(value) {
            return toFarsiDigits(addCommas(value));
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
            margin: $gutter 0;
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
        &_price {
            background-color: rgba($filter-inactive, 0.1);
            padding: $gutter * 0.5;
            margin: $gutter * 0.5 0;
            border-radius: $border-radius-lg;
        }
    }
</style>
