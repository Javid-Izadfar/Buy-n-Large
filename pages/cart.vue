<template>
    <g-container class="p-top-4">
        <cart-list :box-view="true"/>
        <g-row v-if="!cartIsEmpty" class="p-top-2 p-bottom-2">
            <g-col/>
            <g-col cols="6" mobile-cols="18">
                <cart-price :amount="cartPrice"
                            border-top
                            border-bottom>
                    مبلغ کل سبد خرید
                </cart-price>
            </g-col>
        </g-row>
        <g-row class="p-top-2">
            <g-col>
                <g-button variant="primary-outline"
                          :to="{name: 'index'}">
                    بازگشت به محصولات
                </g-button>
            </g-col>
            <g-col v-if="!cartIsEmpty" class="text-left">
                <g-button :to="{name: 'checkout'}">
                    نهایی کردن سفارش
                </g-button>
            </g-col>
        </g-row>
    </g-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    head: () => ({
        title: 'سبد خرید',
    }),
    computed: {
        ...mapGetters(['cartIsEmpty', 'cartPrice']),
    },
};
</script>

<style lang="scss" scoped>
</style>
