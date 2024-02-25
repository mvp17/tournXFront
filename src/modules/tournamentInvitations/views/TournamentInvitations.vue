<template>
  <h1>Tournament invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.invitesTo_tournamentId"
          :items="tournaments"
          :error-messages="(v$.selectTournament.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Tournament"
          required
          @change="v$.selectTournament.$touch"
          @blur="v$.selectTournament.$touch"
        ></v-select>

        <v-select
          v-model="state.teamId"
          :items="teams"
          :error-messages="(v$.selectTeam.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Team"
          required
          @change="v$.selectTeam.$touch"
          @blur="v$.selectTeam.$touch"
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
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useTournamentInvitationsStore } from '../stores/tournamentInvitationStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TournamentInvitationRequestDto } from '../models/tournamentInvitationRequestDto';

  const tournamentInvitationsStore = useTournamentInvitationsStore();
  const tournamentInvitations = computed(() => tournamentInvitationsStore.tournamentInvitations);

  const initialState = {
    invitesTo_tournamentId: 0,
    teamId: 0,
    message: '',
    invitesTo_playerId: 0
  };

  const state = reactive({
    ...initialState,
  });

  const tournaments = [1, 2, 3, 4];
  const teams = [1, 2, 3, 4];

  const rules = {
    invitesTo_tournamentId: { required, numeric },
    teamId: { required, numeric },
    message: { required },
    invitesTo_playerId: { required, numeric },
  };

  const v$ = useVuelidate(rules, state);

  onMounted(() => {
    getTournamentInvitations();
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TournamentInvitationRequestDto = {
      invitesTo_tournamentId: 0,
      teamId: 0,
      message: "",
      invitesTo_playerId: 0
    };
    if (result) {
      request.invitesTo_tournamentId = state.invitesTo_tournamentId;
      request.teamId = state.teamId;
      request.invitesTo_playerId = state.invitesTo_playerId;
      request.message = state.message;
      tournamentInvitationsStore.addTournamentInvitation(request);
    }
    else alert("Validation form failed!");
  }

  function getTournamentInvitations() {
    tournamentInvitationsStore.getAll;
  }

  function clear() {
    v$.value.$reset();
    state.invitesTo_tournamentId = 0;
    state.invitesTo_playerId = 0;
    state.message = "";
    state.teamId = 0;
  }
</script>
