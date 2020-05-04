import Vue from "vue";
import App from "./App.vue";

import SimplePhoneNumberInput from "simple-phone-number-input";
import "simple-phone-number-input/dist/simple-phone-number-input.css";

import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.use(SimplePhoneNumberInput);

new Vue({
  render: h => h(App)
}).$mount("#app");
