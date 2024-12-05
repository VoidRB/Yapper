import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

if (localStorage.getItem("theme")) {
  console.log(`There is a theme`);
  const themestate = JSON.parse(localStorage.getItem("theme"));

  if (themestate === true) {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
} else {
  localStorage.setItem("theme", true);
}
