export const playerRoutes = [
    {
        path: '/team-invitations',
        name: 'Team invitations',
        icon: 'mdi-account-group',
        component: () => import("../../modules/teamInvitations/views/TeamInvitations.vue"),
    },
    {
        path: '/teams',
        name: 'Teams',
        icon: 'mdi-account-group',
        component: () => import("../../modules/teams/views/Teams.vue"),
    }
];

export const tournamentMasterRoutes = [
    {
      path: '/tournaments',
      name: 'Tournaments',
      icon: 'mdi-tournament',
      component: () => import("../../modules/tournaments/views/Tournaments.vue"),
    },
    {
      path: '/tournament-invitations',
      name: 'Tournament invitations',
      icon: 'mdi-tournament',
      component: () => import("../../modules/tournamentInvitations/views/TournamentInvitations.vue"),
    },
    {
      path: '/rounds',
      name: 'Rounds',
      icon: 'mdi-recycle-variant',
      component: () => import("../../modules/rounds/views/Rounds.vue"),
    },
    {
      path: "/matches",
      name: "Matches",
      icon: "mdi-soccer-field",
      component: () => import("../../modules/matches/views/Matches.vue"),
    },
];

export const commonRoutes = [
    {
      path: '/home',
      name: 'Home',
      icon: 'mdi-home',
      component: () => import("../../modules/home/views/Home.vue"),
    },
    {
      path: '/match-results',
      name: 'Match Results',
      icon: 'mdi-soccer-field',
      component: () => import("../../modules/matchResults/views/MatchResults.vue"),
    },
];

export const initialRoutes = [
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
  }
];
