import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import { decode } from "@zaubrik/djwt";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");

window.addEventListener("beforeunload", async () => {
  const user = JSON.parse(
    sessionStorage.getItem("Login-user-data") ||
      localStorage.getItem("Register-user-data"),
  );
  const [_header, payload, _signature] = await decode(user.token);
  try {
    await axios.post(`/api/logout`, {
      userId: payload.payload.userId,
    });
  } catch (error) {
    throw error;
  }
});

if (localStorage.getItem("theme")) {
  console.log(`There is a theme`);
  const themestate = JSON.parse(localStorage.getItem("theme"));

  if (themestate === true) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
} else {
  localStorage.setItem("theme", true);
}
