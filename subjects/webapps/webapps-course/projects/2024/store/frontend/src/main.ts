import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { storeSetup } from "@/store/index";
const app = createApp(App);

app.use(router);

storeSetup(app);

app.mount("#app");
