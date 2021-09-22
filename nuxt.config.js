
import path from 'path';

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'javid-challenge',
        htmlAttrs: {
            lang: 'fa',
            dir: 'rtl',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css' },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'reset-css',
        '~/assets/style/main.scss',
    ],

    styleResources: {
        scss: [
            '~/assets/style/vars/*.scss',
            '~/assets/style/mixins/*.scss',
        ],
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/axios',
        '~plugins/filters',
        { src: '~/plugins/rangeSlider', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://github.com/nuxt-community/style-resources-module
        '@nuxtjs/style-resources',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'https://www.digikala.com/front-end',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, context) {
            if (context.isDev) {
                // Run ESLint on save
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
            // Extend only webpack config for client-bundle
            const src = config.resolve.alias['~'];
            config.resolve.alias['~root'] = path.join(src, '');
            config.resolve.alias['~icons'] = path.join(
                src,
                'components/icons'
            );
            config.resolve.alias['~endpoints'] = path.join(
                src,
                'scripts/utils/endpoints.js'
            );
        },
    },
};
