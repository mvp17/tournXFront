<template>
  <h1>Team invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.playerId"
          :items="players"
          :error-messages="(v$.selectPlayer.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Player"
          required
          @change="v$.selectPlayer.$touch"
          @blur="v$.selectPlayer.$touch"
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

        <v-checkbox
          v-model="state.accepted"
          :error-messages="(v$.accepted.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Accept invitation?"
          required
          @change="v$.accepted.$touch"
          @blur="v$.accepted.$touch"
        ></v-checkbox>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Player</th>
            <th class="text-left">Team</th>
            <th class="text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teamInvitation in teamInvitations"
            :key="teamInvitation.teamId"
          >
            <td>{{ teamInvitation.playerId }}</td>
            <td>{{ teamInvitation.teamId }}</td>
            <td>{{ teamInvitation.message }}</td>
            <td>{{ teamInvitation.accepted }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { useTeamInvitationsStore } from '../stores/teamInvitationStore';
  import { computed } from '@vue/reactivity';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TeamInvitationRequestDto } from '../models/teamInvitationRequestDto';

  const teamInvitationsStore = useTeamInvitationsStore();
  const teamInvitations = computed(() => teamInvitationsStore.teamInvitations);

  const initialState = {
    message: '',
    playerId: "",
    teamId: "",
    accepted: false
  };

  const state = reactive({
    ...initialState,
  });

  const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

  const rules = {
    message: { required },
    playerId: { required },
    teamId: { required },
    accepted: { required }
  };

  const v$ = useVuelidate(rules, state);

  onMounted(() => {
    getTeamInvitations();
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TeamInvitationRequestDto = {
      playerId: 0,
      teamId: 0,
      message: "",
      accepted: false
    };
    if (result) {
      request.playerId = Number(state.playerId);
      request.teamId = Number(state.teamId);
      request.message = state.message;
      request.accepted = state.accepted
      teamInvitationsStore.addTeamInvitation(request);
    }
    else alert("Validation form failed!");
  }

  function getTeamInvitations() {
    teamInvitationsStore.getAll;
  }

  function clear() {
    v$.value.$reset();
    state.playerId = "";
    state.teamId   = "";
    state.message  = "";
    state.accepted = false;
  }
</script>
