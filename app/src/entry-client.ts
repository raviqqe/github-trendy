import createApp from "./app";

(async () => (await createApp()).app.$mount("#app"))();
