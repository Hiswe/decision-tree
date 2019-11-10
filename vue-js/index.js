import Vue from 'vue';
import Application from './application.vue';

new Vue({ render: createElement => createElement(Application) }).$mount('#app');
