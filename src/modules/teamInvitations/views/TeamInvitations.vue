<template>
  <h1>Team invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.playerId"
          :items="players"
          :error-messages="(v$.playerId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Player"
          required
          item-title="username"
          item-value="id"
          @change="v$.playerId.$touch"
          @blur="v$.playerId.$touch"
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
            <th class="text-left">Invitation accepted</th>
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
  import { reactive, toRaw } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { useTeamInvitationsStore } from '../stores/teamInvitationStore';
  import { computed } from '@vue/reactivity';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TeamInvitationRequestDto } from '../models/teamInvitationRequestDto';
  import { usePlayerStore } from '../../users/stores/playerStore';
  import { useTeamsStore } from '../../teams/stores/teamStore';
  import { mustBeGreaterThan0 } from '../../../core/utils/functions';

  const teamInvitationsStore = useTeamInvitationsStore();
  const teamInvitations = computed(() => teamInvitationsStore.teamInvitations);
  const playersStore = usePlayerStore();
  const players = computed(() => toRaw(playersStore.players));
  const teamsStore = useTeamsStore();
  const teams = computed(() => toRaw(teamsStore.teams));

  const initialState = {
    message: "",
    playerId: "",
    teamId: 0,
    accepted: false
  };

  const state = reactive({
    ...initialState,
  });

  const rules = {
    message:  { required },
    playerId: { required },
    teamId:   { required, mustBeGreaterThan0 },
    accepted: { required }
  };

  const v$ = useVuelidate(rules, state);

  onMounted(async () => {
    await teamInvitationsStore.getAll;
    await playersStore.getAll;
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TeamInvitationRequestDto = {
      playerId: "",
      teamId: 0,
      message: "",
      accepted: false
    };
    if (result) {
      request.playerId = state.playerId;
      request.teamId   = state.teamId;
      request.message  = state.message;
      request.accepted = state.accepted

      await teamInvitationsStore.addTeamInvitation(request);
      await teamInvitationsStore.getAll;
      clear();
    }
    else alert("Validation form failed!");
  }

  function clear() {
    v$.value.$reset();
    state.playerId = "";
    state.teamId   = 0;
    state.message  = "";
    state.accepted = false;
  }
</script>
