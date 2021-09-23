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
                <div class="p-2 text-left">
                    <g-button>ثبت سفارش</g-button>
                </div>
            </template>
        </g-modal>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['cartModalIsVisible']),
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
</style>
