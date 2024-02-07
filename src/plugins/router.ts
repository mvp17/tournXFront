import { createWebHistory, createRouter } from 'vue-router';

function authGuard () {
  // User store
  const isAuthenticated = false;
  if (!isAuthenticated) return { name: 'Login'}
}

function playerGuard (to: { path: string }) {
  // User store
  const role = "PLAYER";
  if (role === "PLAYER") return { path: to.path }
  else return { name: 'Login' }
}

function tournamentMasterGuard (to: { path: string }) {
  // User store
  const role = "TOURNAMENT MASTER";
  if (role === "TOURNAMENT MASTER") return { path: to.path }
  else return { name: 'Login' }
}

export const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi-home',
    component: () => import("../modules/home/Home.vue"),
    beforeEnter: authGuard
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    icon: 'mdi-tournament',
    component: () => import("../modules/tournaments/views/Tournaments.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/tournament-invitations',
    name: 'Tournament invitations',
    icon: 'mdi-tournament',
    component: () => import("../modules/tournamentInvitations/views/TournamentInvitations.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/team-invitations',
    name: 'Team invitations',
    icon: 'mdi-account-group',
    component: () => import("../modules/teamInvitations/views/TeamInvitations.vue"),
    beforeEnter: [authGuard, playerGuard]
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'mdi-account-group',
    component: () => import("../modules/teams/views/Teams.vue"),
    beforeEnter: [authGuard, playerGuard]
  },
  {
    path: '/rounds',
    name: 'Rounds',
    icon: 'mdi-recycle-variant',
    component: () => import("../modules/rounds/views/Rounds.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  },
  {
    path: '/match-results',
    name: 'Match Results',
    icon: 'mdi-soccer-field',
    component: () => import("../modules/matchResults/views/MatchResults.vue"),
  },
  {
    path: "/matches",
    name: "Matches",
    icon: "mdi-soccer-field",
    component: () => import("../modules/matches/views/Matches.vue"),
    beforeEnter: [authGuard, tournamentMasterGuard]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
