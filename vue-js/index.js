import Vue from 'vue';
import Application from './application.vue';

const formatPercent = new Intl.NumberFormat(`en`, { style: `percent` }).format;
const formatNumber = new Intl.NumberFormat(`en`, { maximumSignificantDigits: 4 }).format;

Vue.filter(`percent`, formatPercent)
Vue.filter(`number`, formatNumber)

new Vue({ render: createElement => createElement(Application) }).$mount('#app');
