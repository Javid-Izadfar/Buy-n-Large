<template>
    <g-box>
        <g-row>
            <g-col cols="9" mobile-cols="18">
                <g-input v-model="$v.firstName.$model"
                         :state="isValid.firstName"
                         name="firstName">
                    نام
                </g-input>
            </g-col>
            <g-col cols="9" mobile-cols="18">
                <g-input v-model="$v.lastName.$model"
                         :state="isValid.lastName"
                         name="lastName">
                    نام خانوادگی
                </g-input>
            </g-col>
            <g-col cols="9" mobile-cols="18">
                <g-input v-model="$v.email.$model"
                         :state="isValid.email"
                         name="email">
                    ایمیل
                </g-input>
            </g-col>
            <g-col cols="9" mobile-cols="18">
                <g-input v-model="$v.phone.$model"
                         :state="isValid.phone" name="phone">
                    شماره موبایل
                </g-input>
            </g-col>
            <g-col cols="18" mobile-cols="18">
                <g-textarea v-model="$v.address.$model"
                            :state="isValid.address"
                            name="address">
                    آدرس
                </g-textarea>
            </g-col>
        </g-row>
    </g-box>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators';

export default {
    mixins: [
        validationMixin,
    ],
    data: () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    }),
    validations: {
        firstName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(255),
        },
        lastName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(255),
        },
        email: {
            required,
            email,
        },
        phone: {
            required,
            isPhone: (value) => {
                console.log(value);
                const regex = /^(09|\+989|\00989)\d{9}$/;
                return regex.test(String(value).toLowerCase());
            },
        },
        address: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(255),
        },
    },
    computed: {
        isValid() {
            return Object.keys(this.$v.$params).reduce((acc, curr) => {
                return Object.assign(acc, {
                    [curr]: this.$v[curr].$dirty ? !this.$v[curr].$error : undefined,
                });
            }, {});
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
