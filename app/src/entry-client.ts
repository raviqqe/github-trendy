import createApp from "./app";
import "./register-service-worker";

(async () => (await createApp()).app.$mount("#app"))();
