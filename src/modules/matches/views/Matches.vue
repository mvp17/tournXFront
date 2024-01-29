<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item v-for="(match, matchKey) in matches" :key="matchKey">
        <h3>Match {{ matchKey + 1 }}</h3>
        <span v-for="(team, teamKey) in round.rivals" :key="teamKey">
          {{ team.name }}
          <span v-if="teamKey < round.numTeams - 1">&nbsp; VS &nbsp;</span>
        </span>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { mockMatches } from '../../../mocks';
export default {
  data() {
    return {
      matches: mockMatches,
    };
  },
};
</script>
<script setup lang="ts">
defineProps({
  round: { numTeams: Number, rivals: [] },
});
</script>
