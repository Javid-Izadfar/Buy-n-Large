<template>
    <div>
        <g-row tag="ul">
            <product-list-item v-for="product in products"
                               :key="product.id"
                               :product="product"/>
        </g-row>
        <div v-show="isLoading">
            is Loading
        </div>
        <div v-show="!products.length && !isLoading">
            No Result
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array,
            default: () => ([]),
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
