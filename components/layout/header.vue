<template>
    <header class="header">
        <g-container class="h-4">
            <g-row align-v="center" class="h-4">
                <g-col>
                    <g-row align-v="center" no-gutters tag="ul">
                        <li class="p-left-3">
                            <nuxt-link :to="{name: 'index'}">
                                <g-img class="logo" src="/logo.png" alt=""/>
                            </nuxt-link>
                        </li>
                        <li class="p-left-3">
                            <nuxt-link :to="{name: 'index'}">
                                لیست محصولات
                            </nuxt-link>
                        </li>
                        <li>
                            <a href="https://pixar.fandom.com/wiki/Buy_n_Large" target="_blank" rel="noopener noreferrer">
                                درباره ما
                            </a>
                        </li>
                    </g-row>
                </g-col>
                <div class="text-left">
                    <g-button variant="primary-empty"
                              class="cart p-2"
                              title="مشاهده‌ی سبد خرید"
                              @click="openCartModal">
                        <icons-cart/>
                        <span v-show="itemsInCartCount"
                              class="cart_badge">
                            {{ itemsInCartCount | farsi }}
                        </span>
                    </g-button>
                </div>
            </g-row>
        </g-container>
    </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['cart']),
        itemsInCartCount() {
            // TODO: handle multiple same items
            return this.cart.length;
        },
    },
    methods: {
        ...mapMutations(['openCartModal']),
    },
};
</script>

<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: $header-height;
        background-color: rgba($header-bg, $header-opacity);
        backdrop-filter: blur(1rem);
        z-index: 50;
        box-shadow: 0 7px 8px 0 rgba($black, 0.04);
        a {
            padding: $header-height * 0.25 0;
            line-height: $header-height * 0.5;
            display: block;
        }
        .logo {
            height: $header-height * 0.5;
            background: $primary;
            border-radius: $border-radius-lg;
            display: block;
        }
    }
    .cart {
        position: relative;
        &_badge {
            $size: 1rem;
            position: absolute;
            bottom: 0.5rem;
            right: 0.5rem;
            background-color: $primary;
            color: $white;
            width: $size;
            height: $size;
            line-height: $size;
            font-size: $font-size-xs;
            border-radius: $border-radius-full;
            border: solid 2px $header-bg;
            box-sizing: content-box;
        }
    }
</style>
