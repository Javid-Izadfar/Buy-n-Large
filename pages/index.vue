<template>
    <g-container>
        <g-row>
            <g-col cols="15">
                <g-box>
                    put search here
                </g-box>
            </g-col>
            <g-col cols="12" order="2">
                <product-list/>
                <div class="p-top-2 p-bottom-4">
                    <g-button @click="loadMoreProducts"
                              variant="primary-outline"
                              :is-loading="isLoadingProducts"
                              is-block>
                        بارگزاری موارد بیشتر
                    </g-button>
                </div>
            </g-col>
            <g-col tag="aside">
                <div style="position: sticky; top: 2rem">
                    put desktop filter here
                    <pre>
                        {{ appliedFilters }}
                    </pre>
                </div>
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
        ...mapMutations(['setPage']),
        ...mapActions(['fetchProducts']),
        loadMoreProducts() {
            this.setPage(this.appliedFilters.page + 1);
            this.fetchProducts();
        },
    },
};
</script>
