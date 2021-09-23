<template>
    <header class="header">
        <g-container class="h-4">
            <g-row align-v="center" no-gutters class="h-4">
                <g-col cols="9">
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
                <g-col cols="9" class="text-left">
                    2
                </g-col>
            </g-row>
        </g-container>
    </header>
</template>
<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: $header-height;
        background-color: rgba($white, $header-opacity);
        backdrop-filter: blur(1rem);
        z-index: 50;
        box-shadow: 0 7px 8px 0 rgba($black, 0.04);
        a {
            text-decoration: none;
            color: $black;
            padding: $header-height * 0.25 0;
            line-height: $header-height * 0.5;
            transition: color 200ms ease-in-out;
            display: block;
            &:hover {
                color: $secondary;
            }
        }
        .logo {
            height: $header-height * 0.5;
            display: block;
        }
    }
</style>
