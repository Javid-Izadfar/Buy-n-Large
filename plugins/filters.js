import Vue from 'vue';
import { addCommas, toFarsiDigits } from '~/scripts/utils/string';

Vue.filter('thousand', value => {
    return addCommas(value);
});
Vue.filter('farsi', value => {
    return toFarsiDigits(value);
});
