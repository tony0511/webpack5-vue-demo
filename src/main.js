import Vue from 'vue';
import App from '@/App';

import '@css/style.less';

Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
  render: h => h(App),
}).$mount('#app');
