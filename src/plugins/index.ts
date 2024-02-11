import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../pinia';
import { router } from './router/router';
import { App } from 'vue';

export function registerPlugins(app: App<Element>) {
  loadFonts();
  router.addRoute(
    {
        path: '/',
        name: 'Select user',
        component: () => import("../modules/home/views/SelectUserHome.vue"),
    }
    );
    router.addRoute(
    {
        path: '/login',
        name: 'Login',
        component: () => import("../modules/users/views/signIn.vue")
    }
    );
    router.addRoute(
    {
        path: '/register',
        name: 'Register',
        component: () => import("../modules/users/views/signUp.vue")
    }
    );
  app.use(vuetify).use(router).use(pinia);
}
