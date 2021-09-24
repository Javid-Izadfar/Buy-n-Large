<template>
    <g-container class="p-top-4">
        <g-row>
            <g-col order="1">
                <g-box>
                    add form here
                </g-box>
            </g-col>
            <g-col cols="6" mobile-cols="18">
                <cart-list hide-update/>
                <template v-if="!cartIsEmpty">
                    <cart-price :amount="cartPrice"
                                class="m-top-4">
                        مبلغ کل سبد خرید
                    </cart-price>
                    <cart-price :amount="shipmentPrice">
                        هزینه ارسال
                    </cart-price>
                    <cart-price :amount="cartPrice + shipmentPrice"
                                border-bottom
                                border-top
                                class="m-bottom-4">
                        مبلغ قابل پرداخت
                    </cart-price>
                </template>
            </g-col>
        </g-row>
        <g-row class="p-top-2">
            <g-col>
                <g-button variant="primary-outline"
                          :to="{name: 'cart'}">
                    بررسی سبد خرید
                </g-button>
            </g-col>
            <g-col v-if="!cartIsEmpty" class="text-left">
                <g-button>
                    پرداخت حساب
                </g-button>
            </g-col>
        </g-row>
    </g-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware({ store, redirect }) {
        if (store.getters.cartIsEmpty) {
            redirect('/');
        }
    },
    data: () => ({
        shipmentPrice: 250000,
    }),
    head: () => ({
        title: 'نهایی کردن خرید',
    }),
    computed: {
        ...mapGetters(['cartPrice', 'cartIsEmpty']),
    },
};
</script>

<style lang="scss" scoped>
    /deep/ {
        .cart {
            .item_title {
                font-size: $font-size-sm;
            }
        }
    }
</style>
