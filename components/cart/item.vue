<template>
    <div class="item">
        <g-row>
            <g-col cols="4">
                <nuxt-link :to="{
                               name: 'id',
                               params: {
                                   id: item.id
                               }
                           }"
                           :title="`مشاهده‌ی جزئیات ${item.title}`">
                    <g-img :src="item.image || require('~/assets/images/product-image-placeholder.png')"
                           :alt="item.title"
                           lazy/>
                </nuxt-link>
            </g-col>
            <g-col>
                <g-row no-gutters direction="column" class="h-4">
                    <g-col>
                        <p class="item_title">
                            {{ item.title }}
                        </p>
                    </g-col>
                    <div class="w-4">
                        <g-row align-v="center">
                            <g-col>
                                <div class="item_price">
                                    {{ item.price * item.count | toman }} تومان
                                </div>
                            </g-col>
                            <g-col v-if="canUpdate" class="text-left">
                                <g-button @click="deleteFromCart(item)"
                                          variant="secondary-empty"
                                          class="p-1"
                                          title="حذف از سبد خرید">
                                    <icons-trash size="16"/>
                                </g-button>
                                <div class="spinbutton m-right-1">
                                    <g-row no-gutters align-v="center">
                                        <g-button @click="removeFromCart(item)"
                                                  :is-disabled="item.count === 1"
                                                  variant="secondary-empty"
                                                  class="p-1">
                                            <icons-minus size="16"/>
                                        </g-button>
                                        <span class="spinbutton_count">
                                            {{ item.count | farsi }}
                                        </span>
                                        <g-button @click="addToCart(item)"
                                                  variant="secondary-empty"
                                                  class="p-1">
                                            <icons-plus size="16"/>
                                        </g-button>
                                    </g-row>
                                </div>
                            </g-col>
                        </g-row>
                    </div>
                </g-row>
            </g-col>
        </g-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        canUpdate: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        ...mapActions(['addToCart', 'removeFromCart', 'deleteFromCart']),
    },
};
</script>

<style lang="scss" scoped>
    .item {
        border: solid 1px $mute;
        border-radius: $border-radius-base;
        padding: $gutter;
        &_title {
            font-size: $font-size-base;
            margin: $gutter * 0.5 0;
            line-height: 1.5;
        }
        &_price {
            font-size: $font-size-sm;
            font-weight: $font-weight-light;
            line-height: $font-size-base;
            padding: $gutter * 0.5 0;
            opacity: 0.8;
        }
    }
    .spinbutton {
        display: inline-block;
        border: solid 1px $mute;
        border-radius: $border-radius-base;
        &_count {
            font-size: $font-size-sm;
            font-weight: $font-weight-light;
            width: $gutter;
            text-align: center;
            line-height: 1.5;
        }
    }
</style>
