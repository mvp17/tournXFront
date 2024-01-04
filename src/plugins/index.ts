import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../stores';
import router from '../router';

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(pinia);
}
