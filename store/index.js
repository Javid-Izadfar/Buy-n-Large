import { PRODUCTS_LIST } from '~endpoints';

const PAGE_ROWS_COUNT = 21;

export const state = () => ({
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
    setPage (state, page) {
        state.appliedFilters.page = page;
    },
    setProducts (state, products) {
        state.products = products;
    },
};

export const actions = {
    fetchProducts: async function ({ commit, state }) {
        commit('setProductsLoading', true);
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
};

// Allow state mutation for this store module
// Hiding this error on dev mode:
// Error: [vuex] Do not mutate vuex store state outside mutation handlers
export const strict = false;
