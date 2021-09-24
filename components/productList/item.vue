<template>
    <nuxt-link :to="{
                   name: 'id',
                   params: {
                       id: product.id
                   }
               }"
               class="item block h-4"
               :title="`مشاهده‌ی جزئیات ${product.title}`">
        <g-box class="m-bottom-0 h-4">
            <g-row no-gutters direction="column" class="h-4">
                <div>
                    <g-img :src="
                               product.images ?
                                   product.images.main :
                                   require('~/assets/images/product-image-placeholder.png')
                           "
                           height="200"
                           lazy/>

                    <div class="p-top-2">
                        <div class="title">
                            {{ product.title }}
                        </div>
                    </div>
                </div>

                <g-col v-if="product.price" class="text-left">
                    <g-row align-v="center" no-gutters>
                        <g-col>
                            <product-price :amount="product.price"
                                           :has-discount="hasDiscount"/>
                        </g-col>
                        <g-button @click.native="addToBasket"
                                  variant="accent"
                                  class="quick_purchase p-left-2 p-right-2 p-top-1 p-bottom-1"
                                  title="افزودن به سبد خرید"
                                  :is-disabled="!product.price">
                            <icons-cart size="24"/>
                        </g-button>
                    </g-row>
                </g-col>
            </g-row>
        </g-box>
        <g-badge v-if="hasDiscount"
                 icon="sale"
                 :title="`${discountPercent} درصد تخفیف`">
            %{{ discountPercent | farsi }}
        </g-badge>
    </nuxt-link>
</template>

<script>
import { mapActions } from 'vuex';
import discountMixin from '~/scripts/mixins/discount';

export default {
    name: 'ProductListItem',
    mixins: [
        discountMixin,
    ],
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        ...mapActions(['addToCart']),
        addToBasket(evt) {
            evt.preventDefault();
            this.addToCart(this.product);
            this.$snack.success({
                text: 'محصول با موفقیت به سبد خرید اضافه شد',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .item {
        text-decoration: none;
        color: $black;
        transition: color 200ms ease-in-out;
        position: relative;
        .quick_purchase {
            margin-left: -100%;
            margin-right: $gutter;
            transition: all 300ms ease-in-out;
        }
        &:hover {
            color: $secondary;
            .quick_purchase {
                margin-left: 0;
            }
        }
    }
    .badge {
        position: absolute;
        top: $gutter * 0.5;
        right: $gutter * 1.5;
        border: solid ($gutter * 0.5) $white;
    }
    .title {
        $line-height: 1.5;
        line-height: $line-height;
        height: $font-size-base * $line-height * 2;
        overflow: hidden;
    }
</style>
