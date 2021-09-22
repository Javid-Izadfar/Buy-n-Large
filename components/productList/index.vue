<template>
    <div>
        <g-row tag="ul">
            <product-list-item v-for="product in products"
                               :key="product.id"
                               :product="product"/>
        </g-row>
        <div v-show="isLoadingProducts">
            <!-- TODO: add skeleton screen -->
            is Loading
        </div>
        <div v-show="!products.length && !isLoadingProducts">
            <!-- TODO: add illustration -->
            No Result
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ProductList',
    computed: {
        ...mapState(['products', 'isLoadingProducts']),
    },
};
</script>
