import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '../../modules/users/stores/userStore';

function authGuard () {
  const userStore = useUserStore;
  const isAuth = userStore.getUser.token !== "";
  if (!isAuth) return { name: 'Login'}
}

function playerGuard () {
  const userStore = useUserStore;
  const role = userStore.getUser.role;
  if (role !== "PLAYER") return { name: 'Login' }
}

function tournamentMasterGuard () {
  const userStore = useUserStore;
  const role = userStore.getUser.role;
  if (role !== "TOURNAMENT MASTER") return { name: 'Login' }
}

export const routes = [
  {
    path: '/',
    name: 'Select user',
    component: () => import("../../modules/home/views/SelectUserHome.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../../modules/users/views/signIn.vue")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../../modules/users/views/signUp.vue")
  },
  {
    path: '/home',
    name: 'Home',
    icon: 'mdi-home',
    component: () => import("../../modules/home/views/Home.vue"),
    beforeEnter: authGuard
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    icon: 'mdi-tournament',
    component: () => import("../../modules/tournaments/views/Tournaments.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/tournament-invitations',
    name: 'Tournament invitations',
    icon: 'mdi-tournament',
    component: () => import("../../modules/tournamentInvitations/views/TournamentInvitations.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/team-invitations',
    name: 'Team invitations',
    icon: 'mdi-account-group',
    component: () => import("../../modules/teamInvitations/views/TeamInvitations.vue"),
    beforeEnter: [authGuard, playerGuard]
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'mdi-account-group',
    component: () => import("../../modules/teams/views/Teams.vue"),
    beforeEnter: [authGuard, playerGuard]
  },
  {
    path: '/rounds',
    name: 'Rounds',
    icon: 'mdi-recycle-variant',
    component: () => import("../../modules/rounds/views/Rounds.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/match-results',
    name: 'Match Results',
    icon: 'mdi-soccer-field',
    component: () => import("../../modules/matchResults/views/MatchResults.vue"),
  },
  {
    path: "/matches",
    name: "Matches",
    icon: "mdi-soccer-field",
    component: () => import("../../modules/matches/views/Matches.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});