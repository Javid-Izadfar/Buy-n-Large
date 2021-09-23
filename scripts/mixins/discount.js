export default {
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
};
