<template>
    <g-container class="p-top-4">
        <g-row>
            <g-col cols="13" order="2">
                <product-list/>
                <div class="p-top-2 p-bottom-4">
                    <g-button v-show="!isInLastPage && !isLoadingProducts"
                              @click="fetchMoreProducts"
                              variant="primary-outline"
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

import { mapActions, mapState, mapGetters } from 'vuex';

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
        ...mapGetters(['isInLastPage']),
    },
    methods: {
        ...mapActions(['fetchMoreProducts']),
    },
};
</script>
