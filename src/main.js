import './style.css';
import './index.css';
import { createApp } from "vue";
import router from "./router/router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount('#app');
