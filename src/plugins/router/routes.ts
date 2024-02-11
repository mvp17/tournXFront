import { authGuard, playerGuard, tournamentMasterGuard } from "./guards";

export const playerRoutes = [
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
    }
];

export const tournamentMasterRoutes = [
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
      path: '/rounds',
      name: 'Rounds',
      icon: 'mdi-recycle-variant',
      component: () => import("../../modules/rounds/views/Rounds.vue"),
      beforeEnter: [authGuard, tournamentMasterGuard]
    },
    {
      path: "/matches",
      name: "Matches",
      icon: "mdi-soccer-field",
      component: () => import("../../modules/matches/views/Matches.vue"),
      beforeEnter: [authGuard, tournamentMasterGuard]
    },
];

export const routes = [
    {
      path: '/home',
      name: 'Home',
      icon: 'mdi-home',
      component: () => import("../../modules/home/views/Home.vue"),
      beforeEnter: authGuard
    },
    {
      path: '/match-results',
      name: 'Match Results',
      icon: 'mdi-soccer-field',
      component: () => import("../../modules/matchResults/views/MatchResults.vue"),
      beforeEnter: authGuard
    },
];
