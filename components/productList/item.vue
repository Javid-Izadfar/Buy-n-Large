<template>
    <g-col tag="li"
           cols="5">
        <g-box>
            <g-img :src="product.images.main" lazy/>
            {{ product.title }}
            <br>
            {{ product.price.selling_price }}
            {{ product.price.rrp_price }}
            <br>
            {{ product.price.rrp_price - product.price.selling_price }}
            <g-row>
                <g-col cols="10">
                    link to detail
                </g-col>
                <g-col cols="5">
                    quck purchase
                </g-col>
            </g-row>
        </g-box>
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
};
</script>

<style lang="scss" scoped>

</style>
