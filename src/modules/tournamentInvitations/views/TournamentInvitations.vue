<template>
  <h1>Tournament invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.selectTournament"
          :items="tournaments"
          :error-messages="v$.selectTournament.$errors.map((e) => e.$message)"
          label="Tournament"
          required
          @change="v$.selectTournament.$touch"
          @blur="v$.selectTournament.$touch"
        ></v-select>

        <v-select
          v-model="state.selectTeam"
          :items="teams"
          :error-messages="v$.selectTeam.$errors.map((e) => e.$message)"
          label="Team"
          required
          @change="v$.selectTeam.$touch"
          @blur="v$.selectTeam.$touch"
        ></v-select>

        <v-text-field
          v-model="state.message"
          :error-messages="v$.message.$errors.map((e) => e.$message)"
          :counter="10"
          label="Message"
          required
          @input="v$.message.$touch"
          @blur="v$.message.$touch"
        ></v-text-field>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Tournament</th>
            <th class="text-left">Team</th>
            <th class="text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tournamentInvitation in tournamentInvitationsList"
            :key="tournamentInvitation.match"
          >
            <td>{{ tournamentInvitation.tournament }}</td>
            <td>{{ tournamentInvitation.team }}</td>
            <td>{{ tournamentInvitation.message }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tournamentInvitationsList: [
        {
          tournament: '1',
          team: 'abc',
          message: 'qwer',
        },
        {
          tournament: '2',
          team: 'abc',
          message: 'tyui',
        },
        {
          tournament: '3',
          team: 'abc',
          message: 'asdfg',
        },
        {
          tournament: '4',
          team: 'abc',
          message: 'hjkl',
        },
      ],
    };
  },
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useTournamentInvitationsStore } from '../stores/tournamentInvitations';

const tournamentInvitationsStore = useTournamentInvitationsStore();
const tournamentInvitations = computed(
  () => tournamentInvitationsStore.tournamentInvitations
);

const initialState = {
  message: '',
  selectTournament: null,
  selectTeam: null,
};

const state = reactive({
  ...initialState,
});

const tournaments = [
  'Tournament 1',
  'Tournament 2',
  'Tournament 3',
  'Tournament 4',
];
const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

const rules = {
  message: { required },
  selectTournament: { required },
  selectTeam: { required },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  //getTournamentInvitations();
});

async function submit() {
  const result = await v$.value.$validate();
  const request = {};
  if (result) {
    for (const key of Object.keys(initialState)) {
      request[key] = state[key];
    }
    //tournamentInvitationsStore.addTournamentInvitation(request);
  }
}

function getTournamentInvitations() {
  tournamentInvitationsStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
../features/tournamentInvitations/stores/tournamentInvitations