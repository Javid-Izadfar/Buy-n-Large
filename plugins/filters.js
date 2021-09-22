import Vue from 'vue';
import { addCommas, toFarsiDigits } from '~/scripts/utils/string';

Vue.filter('thousand', value => {
    return addCommas(value);
});

Vue.filter('farsi', value => {
    return toFarsiDigits(value);
});

Vue.filter('toman', value => {
    return toFarsiDigits(addCommas(Math.floor(value / 10)));
});
