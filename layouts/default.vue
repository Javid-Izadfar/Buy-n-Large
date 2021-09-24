<template>
    <div>
        <layout-header/>
        <div class="nuxt_wrapper">
            <Nuxt/>
        </div>
        <g-modal v-model="cartModalVisibility"
                 title="سبد خرید">
            <cart-list/>
            <template #footer>
                <div class="p-2">
                    <g-row v-if="!cartIsEmpty" align-v="center">
                        <g-col>
                            <div class="payableAmount">
                                <small>مبلغ قابل پرداخت</small>
                                <div>
                                    <strong>{{ cartPrice | toman }}</strong>
                                    <small>تومان</small>
                                </div>
                            </div>
                        </g-col>
                        <g-col class="text-left">
                            <g-button :to="{name: 'index'}">
                                ثبت سفارش
                            </g-button>
                        </g-col>
                    </g-row>
                </div>
            </template>
        </g-modal>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    middleware({ store }) {
        store.commit('closeCartModal');
    },
    computed: {
        ...mapState(['cartModalIsVisible']),
        ...mapGetters(['cartIsEmpty', 'cartPrice']),
        cartModalVisibility: {
            get() {
                return this.cartModalIsVisible;
            },
            set(value) {
                if (value) {
                    this.openCartModal();
                } else {
                    this.closeCartModal();
                }
            },
        },
    },
    methods: {
        ...mapMutations(['closeCartModal', 'openCartModal']),
    },
};
</script>

<style lang="scss" scoped>
    .nuxt_wrapper {
        padding-top: $header-height + $gutter;
    }
    .payableAmount {
        opacity: 0.8;
        line-height: 1.5;
    }
</style>
