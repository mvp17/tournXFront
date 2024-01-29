<template>
  <h1>Team invitations</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.selectPlayer"
          :items="players"
          :error-messages="(v$.selectPlayer.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Player"
          required
          @change="v$.selectPlayer.$touch"
          @blur="v$.selectPlayer.$touch"
        ></v-select>

        <v-select
          v-model="state.selectTeam"
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
            <th class="text-left">Player</th>
            <th class="text-left">Team</th>
            <th class="text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teamInvitation in teamInvitationsList"
            :key="teamInvitation.team"
          >
            <td>{{ teamInvitation.player }}</td>
            <td>{{ teamInvitation.team }}</td>
            <td>{{ teamInvitation.message }}</td>
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
      teamInvitationsList: [
        {
          player: '1',
          team: 'abc',
          message: 'qwer',
        },
        {
          player: '2',
          team: 'abc',
          message: 'tyui',
        },
        {
          player: '3',
          team: 'abc',
          message: 'asdfg',
        },
        {
          player: '4',
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
import { useTeamInvitationsStore } from '../stores/teamInvitations';
import { computed } from '@vue/reactivity';
import { VuelidateError } from '../../../core/interfaces/VuelidateError';

const teamInvitationsStore = useTeamInvitationsStore();
const teamInvitations = computed(() => teamInvitationsStore.teamInvitations);

const initialState = {
  message: '',
  selectPlayer: null,
  selectTeam: null,
};

const state = reactive({
  ...initialState,
});

const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

const rules = {
  message: { required },
  selectPlayer: { required },
  selectTeam: { required },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  getTeamInvitations();
});

async function submit() {
  const result = await v$.value.$validate();
  const request = {};
  if (result) {
    for (const key of Object.keys(initialState)) {
      request[key] = state[key];
    }
    //teamInvitations.addTeamInvitation(request);
  }
}

function getTeamInvitations() {
  //teamInvitationsStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
