<template>
  <h1>Tournament invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.invitesTo_tournamentId"
          :items="tournaments"
          :error-messages="(v$.invitesTo_tournamentId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Invites to tournament"
          required
          item-title="name"
          item-value="id"
          @change="v$.invitesTo_tournamentId.$touch"
          @blur="v$.invitesTo_tournamentId.$touch"
        ></v-select>

        <v-select
          v-model="state.teamId"
          :items="teams"
          :error-messages="(v$.teamId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Team"
          required
          item-title="name"
          item-value="id"
          @change="v$.teamId.$touch"
          @blur="v$.teamId.$touch"
        ></v-select>

        <v-select
          v-model="state.invitesTo_playerId"
          :items="players"
          :error-messages="(v$.invitesTo_playerId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Invites player"
          required
          item-title="username"
          item-value="id"
          @change="v$.invitesTo_playerId.$touch"
          @blur="v$.invitesTo_playerId.$touch"
        ></v-select>

        <v-text-field
          v-model="state.message"
          :error-messages="(v$.message.$errors as VuelidateError[]).map((e) => e.$message)"
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
            <th class="text-left">Player</th>
            <th class="text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tournamentInvitation in tournamentInvitations"
            :key="tournamentInvitation.invitesTo_tournamentId"
          >
            <td>{{ tournamentInvitation.invitesTo_tournamentId }}</td>
            <td>{{ tournamentInvitation.teamId }}</td>
            <td>{{ tournamentInvitation.invitesTo_playerId }}</td>
            <td>{{ tournamentInvitation.message }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
  import { reactive, toRaw } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useTournamentInvitationsStore } from '../stores/tournamentInvitationStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TournamentInvitationRequestDto } from '../models/tournamentInvitationRequestDto';
  import { useTournamentsStore } from '../../tournaments/stores/tournamentStore';
  import { useTeamsStore } from '../../teams/stores/teamStore';
  import { mustBeGreaterThan0 } from '../../../core/utils/functions';
  import { usePlayerStore } from '../../users/stores/playerStore';

  const tournamentInvitationsStore = useTournamentInvitationsStore();
  const tournamentInvitations = computed(() => tournamentInvitationsStore.tournamentInvitations);
  const tournamentsStore = useTournamentsStore();
  const tournaments = computed(() => toRaw(tournamentsStore.tournaments));
  const teamsStore = useTeamsStore();
  const teams = computed(() => toRaw(teamsStore.teams));
  const playersStore = usePlayerStore();
  const players = computed(() => toRaw(playersStore.players));

  const initialState = {
    invitesTo_tournamentId: 0,
    teamId: 0,
    message: "",
    invitesTo_playerId: ""
  };

  const state = reactive({
    ...initialState,
  });

  const rules = {
    invitesTo_tournamentId: { required, numeric, mustBeGreaterThan0 },
    teamId:                 { required, numeric, mustBeGreaterThan0 },
    message:                { required },
    invitesTo_playerId:     { required },
  };

  const v$ = useVuelidate(rules, state);

  onMounted(() => {
    getTournamentInvitations();
    getTeams();
    getPlayers();
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TournamentInvitationRequestDto = {
      invitesTo_tournamentId: 0,
      teamId: 0,
      message: "",
      invitesTo_playerId: ""
    };
    if (result) {
      request.invitesTo_tournamentId = state.invitesTo_tournamentId;
      request.teamId                 = state.teamId;
      request.invitesTo_playerId     = state.invitesTo_playerId;
      request.message                = state.message;

      await tournamentInvitationsStore.addTournamentInvitation(request);
    }
    else alert("Validation form failed!");
  }

  async function getTournamentInvitations() {
    await tournamentInvitationsStore.getAll;
  }

  async function getTeams() {
    await teamsStore.getAll;
  }

  async function getPlayers() {
    await playersStore.getAll;
  }

  function clear() {
    v$.value.$reset();
    state.invitesTo_tournamentId = 0;
    state.invitesTo_playerId     = "";
    state.message                = "";
    state.teamId                 = 0;
  }
</script>
