import { PRODUCTS_LIST } from '~endpoints';

const PAGE_ROWS_COUNT = 18;

export const state = () => ({
    cart: [], // persisted
    possibleFilters: [],
    appliedFilters: {
        rows: PAGE_ROWS_COUNT,
        page: 1,
    },
    isLoadingProducts: false,
    cartModalIsVisible: false,
    products: [],
});

export const mutations = {
    setCart (state, products) {
        state.cart = products;
    },
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
    openCartModal (state) {
        state.cartModalIsVisible = true;
    },
    closeCartModal (state) {
        state.cartModalIsVisible = false;
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
                const filters = Object.entries(data.filters).map((filter) => ({
                    key: filter[0],
                    ...filter[1],
                }));
                // bad api design
                // filters.forEach(item => {
                //     if (item.type === 'slider') {
                //         commit('setFilter', { item: `${item.key}[max]`, value: item.options.max });
                //         commit('setFilter', { item: `${item.key}[min]`, value: item.options.min });
                //     }
                // });
                commit('setPossibleFilters', [
                    {
                        type: 'search',
                        key: 'q',
                        title: 'جستجو در نتایج',
                    },
                    ...filters,
                ]);
                commit('setProducts', data.products);
            }
        }).catch(() => {
            // TODO: use something better that log
            console.error('به چوخ رفت');
        }).finally(() => {
            commit('setProductsLoading', false);
        });
    },
    deleteFromCart({ commit, state }, product) {
        // TODO: Add Notification
        const productIndex = state.cart.findIndex(item => item.id === product.id);
        if (productIndex > -1) {
            // Remove Item from Cart
            commit('setCart',
                state.cart.filter((_, i) => i !== productIndex),
            );
        }
    },
    removeFromCart({ commit, state }, product) {
        // TODO: Add Notification
        const productIndex = state.cart.findIndex(item => item.id === product.id);
        if (productIndex > -1) {
            if (state.cart[productIndex].count > 1) {
                // Remove One Count from An Item
                commit('setCart',
                    state.cart.map((item, index) => {
                        if (index === productIndex) {
                            return {
                                ...item,
                                count: item.count - 1,
                            };
                        } else {
                            return item;
                        }
                    }),
                );
            } else {
                // Remove Item from Cart
                commit('setCart',
                    state.cart.filter((_, i) => i !== productIndex),
                );
            }
        }
    },
    addToCart({ commit, state }, product) {
        // TODO: Add Notification
        const productIndex = state.cart.findIndex(item => item.id === product.id);
        if (productIndex > -1) {
            // Added One to An Existing Item
            commit('setCart',
                state.cart.map((item, index) => {
                    if (index === productIndex) {
                        return {
                            ...item,
                            count: item.count + 1,
                        };
                    } else {
                        return item;
                    }
                }),
            );
        } else {
            // Push New Item to Cart
            commit('setCart', [
                ...state.cart,
                {
                    id: product.id,
                    title: product.title,
                    image: product.images?.main,
                    price: product.price?.selling_price,
                    count: 1,
                },
            ]);
        }
    },
};

export const getters = {
    cartCount (state) {
        return state.cart.reduce((acc, cur) => acc + cur.count, 0);
    },
    cartPrice (state) {
        return state.cart.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
    },
    cartIsEmpty (state) {
        return !state.cart.length;
    },
};

// Allow state mutation for this store module
// Hiding this error on dev mode:
// Error: [vuex] Do not mutate vuex store state outside mutation handlers
export const strict = false;
