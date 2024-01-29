<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item v-for="(round, roundKey) in rounds" :key="roundKey">
        <!--
        routerLink to round detail where it lists all the matches of 
        that round provided by the match list component
      -->
        <h3>Round {{ roundKey + 1 }}</h3>
        <Matches :round="round" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Matches from '../../matches/views/Matches.vue';
import { teamAv, teamGG, teamF4 } from '../../../mocks';
export default {
  components: { Matches },
  data() {
    return {
      tournamentId: '0',
      rounds: [
        {
          numTeams: 2,
          rivals: [teamAv, teamGG],
        },
        {
          numTeams: 3,
          rivals: [teamAv, teamGG, teamF4],
        },
        {
          numTeams: 2,
          rivals: [teamGG, teamF4],
        },
        {
          numTeams: 2,
          rivals: [teamAv, teamF4],
        },
      ],
    };
  },
};
</script>
