import './bootstrap';

import { createApp } from "vue";
import AgoraVideo from "./components/AgoraVideo.vue";

const app = createApp({});
app.component("agora-video", AgoraVideo);
app.mount("#app");
