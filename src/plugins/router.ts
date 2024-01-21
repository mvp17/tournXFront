import { createWebHistory, createRouter } from 'vue-router';
import Home from '../features/home/Home.vue';
import Tournaments from '../features/tournaments/views/Tournaments.vue';
//import Matches from "@/views/Matches.vue";
import MatchResults from '../features/matchResults/views/MatchResults.vue';
import Players from '../features/players/views/Players.vue';
import Rounds from '../features/rounds/Rounds.vue';
import TeamInvitations from '../features/teamInvitations/views/TeamInvitations.vue';
import Teams from '../features/teams/views/Teams.vue';
import TournamentInvitations from '../features/tournamentInvitations/views/TournamentInvitations.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi-home',
    component: Home,
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    icon: 'mdi-tournament',
    component: Tournaments,
  },
  {
    path: '/tournament-invitations',
    name: 'Tournament invitations',
    icon: 'mdi-tournament',
    component: TournamentInvitations,
  },
  {
    path: '/team-invitations',
    name: 'Team invitations',
    icon: 'mdi-account-group',
    component: TeamInvitations,
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'mdi-account-group',
    component: Teams,
  },
  {
    path: '/rounds',
    name: 'Rounds',
    icon: 'mdi-recycle-variant',
    component: Rounds,
  },
  {
    path: '/players',
    name: 'Players',
    icon: 'mdi-football-helmet',
    component: Players,
  },
  {
    path: '/match-results',
    name: 'Match Results',
    icon: 'mdi-soccer-field',
    component: MatchResults,
  },
  /*
  {
    path: "/matches",
    name: "Matches",
    icon: "mdi-soccer-field",
    component: Matches,
  },
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
