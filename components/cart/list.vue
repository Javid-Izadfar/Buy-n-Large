<template>
    <ul :class="[
        'cart',
        {
            'cart--empty': cartIsEmpty
        }
    ]">
        <li v-for="item in cart"
            :key="item.id"
            class="m-bottom-2">
            <cart-item :item="item"
                       :hide-update="hideUpdate"
                       :box-view="boxView"/>
        </li>
        <li class="cart_error">
            سبد خرید شما خالی است!
        </li>
    </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    props: {
        hideUpdate: {
            type: Boolean,
            default: false,
        },
        boxView: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState(['cart']),
        ...mapGetters(['cartIsEmpty']),
    },
};
</script>

<style lang="scss" scoped>
    .cart {
        $self: &;
        &_error {
            display: none;
        }
        &--empty {
            #{ $self }_error {
                display: block;
                text-align: center;
                padding: $gutter * 2;
                opacity: 0.6;
                font-size: $font-size-lg;
            }
        }
    }
</style>
