<template>
    <div
        :class="[
            'price',
            {
                'price--discounted': hasDiscount
            }
        ]">
        <div class="price_rrp">
            {{ amount.rrp_price | toman }}
            <span v-if="!hasDiscount" class="price_currency">
                تومان
            </span>
        </div>
        <div v-if="hasDiscount" class="price_selling">
            {{ amount.selling_price | toman }}
            <span class="price_currency">
                تومان
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        amount: {
            type: Object,
            default: () => ({}),
        },
        hasDiscount: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .price {
        $self: &;
        color: $black;
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
                font-size: $font-size-base;
                font-weight: $font-weight-light;
                text-decoration: line-through;
                opacity: 0.8;
            }
        }
    }
</style>
