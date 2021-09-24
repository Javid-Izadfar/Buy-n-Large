<template>
    <g-container>
        <g-row tag="ul"
               class="m-bottom-2"
               align-v="center"
               no-gutters>
            <li>
                <g-row align-v="center" no-gutters>
                    <span class="bold p-left-1">
                        بای اند لارج
                    </span>
                    <icons-chevron size="14"/>
                </g-row>
            </li>
            <li>
                <nuxt-link :to="{name: 'index'}"
                           class="p-right-1 p-left-1"
                           title="مشاهده‌ی همه‌ی محصولات">
                    لیست محصولات
                </nuxt-link>
            </li>
        </g-row>
        <g-row>
            <g-col cols="7" mobile-cols="18">
                <g-box>
                    <g-img :src="
                               product.images ?
                                   product.images.main :
                                   require('~/assets/images/product-image-placeholder.png')
                           "
                           :alt="product.title"/>
                </g-box>
            </g-col>
            <g-col>
                <h1 class="title">
                    {{ product.title }}
                </h1>
                <g-row no-gutters>
                    <g-badge v-if="product.rating && product.rating.rate > 60"
                             variant="success"
                             icon="heart"
                             class="m-left-1"
                             :title="`${product.rating.rate} امتیاز از 100 با ${product.rating.count} رأی`">
                        <small>۱۰۰ / </small>
                        {{ product.rating.rate | farsi }}
                    </g-badge>
                    <g-badge v-if="hasDiscount"
                             icon="sale"
                             :title="`${discountPercent} درصد تخفیف`">
                        %{{ discountPercent | farsi }}
                    </g-badge>
                </g-row>
                <div v-if="product" class="p-top-4 p-bottom-4">
                    <product-price :amount="product.price"
                                   :has-discount="hasDiscount"/>
                </div>
                <g-button variant="accent"
                          @click="addToBasket"
                          :is-disabled="!product.price"
                          title="افزودن به سبد خرید">
                    <g-row no-gutters align-v="center">
                        <span class="m-left-2">
                            <icons-cart/>
                        </span>
                        افزودن به سبد خرید
                    </g-row>
                </g-button>
                <article class="m-top-3 p-top-3 m-b-3">
                    <h2>
                        نقد و بررسی اجمالی
                    </h2>
                    <p>
                        {{ product.title }} معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.
                    </p>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                </article>
            </g-col>
        </g-row>
    </g-container>
</template>

<script>
import { PRODUCT_DETAIL } from '~endpoints';
import { mapActions } from 'vuex';
import discountMixin from '~/scripts/mixins/discount';

export default {
    mixins: [
        discountMixin,
    ],
    async asyncData({ app, params, redirect }) {
        const { data } = await app.$axios.$get(PRODUCT_DETAIL(params.id));

        if (!data) {
            redirect({
                name: 'index',
            });
        }

        const productSlug = app.$slugify(data.product.title);
        if (params.slug && (params.slug !== productSlug)) {
            redirect({
                name: 'id-slug',
                params: {
                    id: params.id,
                    slug: productSlug,
                },
            });
        }

        return {
            product: data.product || {},
        };
    },
    head() {
        return {
            title: `خرید آنلاین ${this.product.title}`,
            link: [{
                rel: 'canonical',
                href: `/${this.product.id}/${this.$slugify(this.product.title)}`,
            }],
        };
    },
    methods: {
        ...mapActions(['addToCart']),
        addToBasket() {
            this.addToCart(this.product);
            this.$snack.success({
                text: 'محصول با موفقیت به سبد خرید اضافه شد',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .title {
        font-size: $font-size-xl;
        line-height: 1.25;
        margin: $gutter 0;
    }
    .rate {
        background: $success;
        display: inline-block;

    }
    /deep/ .price {
        $self: &;
        &_rrp,
        &_selling {
            font-size: $font-size-xl;
        }
        &_currency {
            font-size: $font-size-base;
        }
        &--discounted {
            #{$self}_rrp {
                font-size: $font-size-lg;
                opacity: 0.6;
            }
        }
    }
    article {
        h2 {
            font-size: $font-size-lg;
            margin-bottom: $gutter;
        }
        p {
            line-height: 1.5;
            font-weight: $font-weight-light;
            color: rgba($black, 0.8);
            margin-bottom: $gutter;
        }
    }
</style>
