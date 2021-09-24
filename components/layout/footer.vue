<template>
    <footer class="footer">
        <g-container class="text-center">
            <div class="m-bottom-2">
                <nuxt-link :to="{name: 'index'}">
                    <g-img class="m-0" src="/logo.png" alt="Buy and Large" height="20"/>
                </nuxt-link>
            </div>
            <p class="m-bottom-2">
                وبسایت بای اند لارج به عنوان یک پروژه‌ی کدچلنج برای شرکت DigiCloud ساخته شده است.
            </p>
            <a href="mailto:javid.izadfar@gmail.com">جاوید ایزدفر</a>
        </g-container>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        background-color: rgba($mute, 0.2);
        padding: $gutter * 4 0;
    }
</style>
