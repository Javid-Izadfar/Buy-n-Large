import { PRODUCTS_LIST } from '~endpoints';

const PAGE_ROWS_COUNT = 18;

export const state = () => ({
    possibleFilters: [],
    appliedFilters: {
        rows: PAGE_ROWS_COUNT,
        page: 1,
    },
    isLoadingProducts: false,
    products: [],
});

export const mutations = {
    setProductsLoading (state, isLoading) {
        state.isLoadingProducts = isLoading;
    },
    setPossibleFilters (state, filters) {
        state.possibleFilters = filters;
    },
    setFilter (state, { item, value }) {
        state.appliedFilters = Object.assign({},
            state.appliedFilters,
            {
                [item]: value,
            });
    },
    setProducts (state, products) {
        state.products = products;
    },
};

export const actions = {
    fetchMoreProducts: async function ({ commit, state }) {
        commit('setProductsLoading', true);
        commit('setFilter', { item: 'page', value: state.appliedFilters.page + 1 });
        await this.$axios.$get(PRODUCTS_LIST, {
            params: {
                ...state.appliedFilters,
            },
        }).then(({ data }) => {
            if (data) {
                commit('setProducts', [
                    ...state.products,
                    ...data.products,
                ]);
            }
        }).catch(() => {
            // TODO: use something better that log
            console.error('به چوخ رفت');
        }).finally(() => {
            commit('setProductsLoading', false);
        });
    },
    fetchProducts: async function ({ commit, state }) {
        commit('setProductsLoading', true);
        // Reset Pagination
        commit('setFilter', { item: 'page', value: 1 });
        commit('setFilter', { item: 'rows', value: PAGE_ROWS_COUNT });
        commit('setProducts', []);

        await this.$axios.$get(PRODUCTS_LIST, {
            params: {
                ...state.appliedFilters,
            },
        }).then(({ data }) => {
            if (data) {
                commit('setPossibleFilters', Object.entries(data.filters).map((filter) => ({
                    key: filter[0],
                    ...filter[1],
                })));
                commit('setProducts', data.products);
            }
        }).catch(() => {
            // TODO: use something better that log
            console.error('به چوخ رفت');
        }).finally(() => {
            commit('setProductsLoading', false);
        });
    },
};

// Allow state mutation for this store module
// Hiding this error on dev mode:
// Error: [vuex] Do not mutate vuex store state outside mutation handlers
export const strict = false;
