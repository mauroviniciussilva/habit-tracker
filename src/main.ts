import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import { Storage } from '@ionic/storage';

import { NotificationService } from '@/utils/NotificationService';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/utils.css';

/* Internationalization */
import enUS from '@/i18n/enUS.json';
import ptBR from '@/i18n/ptBR.json';

NotificationService.init();

const i18n = createI18n({
  legacy: false,
  locale: window.navigator.language,
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'pt-BR': ptBR
  }
});

const app = createApp(App);
app.use(IonicVue);
app.use(router);
app.use(i18n);

router.isReady().then(async () => {
  const store = new Storage();
  await store.create();
  app.mount('#app');
});
