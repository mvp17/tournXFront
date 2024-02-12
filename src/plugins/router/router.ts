import { createWebHistory, createRouter } from 'vue-router';
import { playerRoutes, tournamentMasterRoutes, commonRoutes, initialRoutes } from './routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...playerRoutes,
    ...tournamentMasterRoutes,
    ...commonRoutes,
    ...initialRoutes
  ],
});
