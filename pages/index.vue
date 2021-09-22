<template>
    <g-container>
        <g-row>
            <g-col cols="18">
                <g-box>
                    put search here
                </g-box>
            </g-col>
            <g-col cols="13" order="2">
                <product-list/>
                <div class="p-top-2 p-bottom-4">
                    <g-button @click="loadMoreProducts"
                              variant="primary-outline"
                              :is-loading="isLoadingProducts"
                              is-block>
                        بارگذاری موارد بیشتر
                    </g-button>
                </div>
            </g-col>
            <g-col cols="5" tag="aside">
                <product-list-filter/>
            </g-col>
        </g-row>
    </g-container>
</template>

<script>

import { mapMutations, mapActions, mapState } from 'vuex';

export default {
    async asyncData({ app, store }) {
        if (!store.state.products.length) {
            await Promise.all([
                store.dispatch('fetchProducts'),
            ]);
        }
    },
    computed: {
        ...mapState(['appliedFilters', 'isLoadingProducts']),
    },
    methods: {
        ...mapMutations(['setFilter']),
        ...mapActions(['fetchProducts']),
        loadMoreProducts() {
            this.setFilter({
                item: 'page',
                value: this.appliedFilters.page + 1,
            });
            this.fetchProducts();
        },
    },
};
</script>
