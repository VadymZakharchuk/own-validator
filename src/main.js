import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./styles/mixins.module.scss";
import "./styles/vars.module.scss";

createApp(App).use(store).use(router).mount("#app");
