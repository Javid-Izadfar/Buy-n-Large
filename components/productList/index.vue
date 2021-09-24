<template>
    <div>
        <g-row tag="ul">
            <product-list-item v-for="product in products"
                               :key="product.id"
                               :product="product"/>
        </g-row>
        <div v-show="isLoadingProducts">
            <!-- TODO: add skeleton screen -->
            <div class="text-center p-2">
                در حال بارگذاری
            </div>
        </div>
        <div v-show="!products.length && !isLoadingProducts">
            <g-row justify="center">
                <g-col cols="10">
                    <g-img :src="require('~/assets/images/undraw/notify.svg')"/>
                    <p class="text-center m-0 p-2">
                        متاسفانه نتیجه‌ای یافت نشد
                    </p>
                </g-col>
            </g-row>
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
