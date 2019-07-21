import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueSVGIcon from "vue-svgicon";

Vue.config.productionTip = false;
Vue.use(VueSVGIcon, {
  isStroke: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
