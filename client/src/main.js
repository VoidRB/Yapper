import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

if (localStorage.getItem("theme")) {
  console.log(`There is a theme`);
  let themestate = JSON.parse(localStorage.getItem("theme"));

  if (themestate === true) {
    document.body.classList.remove("dark");
    console.log(themestate);
    console.log(`Light Theme`);
  } else {
    document.body.classList.add("dark");
    console.log(themestate);
    console.log(`Dark Theme`);
  }
} else {
  localStorage.setItem("theme", "true");
}
