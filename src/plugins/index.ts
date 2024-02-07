import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../pinia';
import { router } from './router';
import { App } from 'vue';

export function registerPlugins(app: App<Element>) {
  loadFonts();
  app.use(vuetify).use(router).use(pinia);
}
