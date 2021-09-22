<template>
    <g-col tag="li"
           cols="5"
           class="m-bottom-4">
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
                        <g-img :src="product.images.main" height="200" lazy/>

                        <div class="p-top-2">
                            <div class="title">
                                {{ product.title }}
                            </div>
                        </div>
                    </div>

                    <g-col class="text-left">
                        <g-row align-v="center" no-gutters>
                            <g-col v-if="product.price">
                                <div
                                    :class="[
                                        'price',
                                        {
                                            'price--discounted': hasDiscount
                                        }
                                    ]">
                                    <div class="price_rrp">
                                        {{ product.price.rrp_price / 10 | thousand | farsi }}
                                        <span v-if="!hasDiscount" class="price_currency">
                                            تومان
                                        </span>
                                    </div>
                                    <div v-if="hasDiscount" class="price_selling">
                                        {{ product.price.selling_price / 10 | thousand | farsi }}
                                        <span class="price_currency">
                                            تومان
                                        </span>
                                    </div>
                                </div>
                            </g-col>
                            <g-button @click.native="addToBasket"
                                      variant="accent"
                                      class="quick_purchase p-left-2 p-right-2 p-top-1 p-bottom-1"
                                      title="افزودن به سبد خرید">
                                <icons-cart size="24"/>
                            </g-button>
                        </g-row>
                    </g-col>
                </g-row>
            </g-box>
            <div v-if="hasDiscount" class="badge">
                <g-row no-gutters align-v="center">
                    <span class="m-left-1 m-right-1">%{{ discountPercent | farsi }}</span>
                    <icons-sale size="24"/>
                </g-row>
            </div>
        </nuxt-link>
    </g-col>
</template>

<script>
export default {
    name: 'ProductListItem',
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        discountPercent() {
            try {
                return Math.floor(
                    (1 - (this.product.price.selling_price / this.product.price.rrp_price)) * 100
                );
            } catch {
                return 0;
            }
        },
        hasDiscount() {
            return this.discountPercent > 0;
        },
    },
    methods: {
        addToBasket(evt) {
            evt.preventDefault();
            alert('add to cart');
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
        background: $secondary;
        color: $white;
        position: absolute;
        top: $gutter * 0.5;
        right: $gutter * 1.5;
        padding: ($gutter * 0.25) ($gutter * 0.3);
        border-radius: $border-radius-xl;
        font-size: $font-size-sm;
        font-weight: $font-weight-light;
        border: solid ($gutter * 0.5) $white;
        line-height: 1.5;
    }
    .title {
        $line-height: 1.5;
        line-height: $line-height;
        height: $font-size-base * $line-height * 2;
        overflow: hidden;
    }
    .price {
        $self: &;
        &_rrp,
        &_selling {
            font-size: $font-size-lg;
            font-weight: $font-weight-bold;
        }
        &_currency {
            font-size: $font-size-sm;
            font-weight: $font-weight-light;
        }
        &--discounted {
            #{$self}_rrp {
                font-weight: $font-weight-light;
                font-size: $font-size-base;
                opacity: 0.8;
                text-decoration: line-through;
            }
        }
    }
</style>
