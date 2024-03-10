<template>
  <h1>Teams</h1>
  <v-row>
    <v-col>
      <form>
        <v-text-field
          v-model="state.name"
          :error-messages="(v$.name.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Name"
          required
          @input="v$.name.$touch"
          @blur="v$.name.$touch"
        ></v-text-field>

        <v-select
            v-model="state.level"
            :items="levels"
            :error-messages="(v$.level.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Level"
            item-title="level"
            item-value="value"
            required
            @change="v$.level.$touch"
            @blur="v$.level.$touch"
        ></v-select>

        <v-text-field
          v-model="state.game"
          :error-messages="(v$.game.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Game"
          required
          @input="v$.game.$touch"
          @blur="v$.game.$touch"
        ></v-text-field>

        <v-text-field
          v-model.number="state.maxPlayers"
          :error-messages="(v$.maxPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Maximum of players"
          required
          type="number"
          @input="v$.maxPlayers.$touch"
          @blur="v$.maxPlayers.$touch"
        ></v-text-field>

        <v-select
            v-model="state.leaderPlayerId"
            :items="players"
            :error-messages="(v$.leaderPlayerId.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Leader Player"
            required
            item-title="username"
            item-value="id"
            @change="v$.leaderPlayerId.$touch"
            @blur="v$.leaderPlayerId.$touch"
        ></v-select>

        <v-select
            v-model="state.players"
            :items="players"
            :error-messages="(v$.players.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Players"
            required
            item-title="username"
            item-value="id"
            multiple
            @change="v$.players.$touch"
            @blur="v$.players.$touch"
            variant="outlined"
        ></v-select>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-data-table
        :items="teams"
        class="elevation-1"
        item-key="name"
        items-per-page="5"
      ></v-data-table>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
  import { reactive, toRaw } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric, minLength, between } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useTeamsStore } from '../stores/teamStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TeamRequestDto } from '../models/teamRequestDto';
  import { usePlayerStore } from '../../users/stores/playerStore';

  const teamsStore = useTeamsStore();
  const teams = computed(() => teamsStore.teams);
  const playersStore = usePlayerStore();
  const players = computed(() => toRaw(playersStore.players));
  const levels = [
    { level: "Begginer",     value: 0 },
    { level: "Amateur",      value: 1 },
    { level: "Professional", value: 2 }
  ];

  const initialState = {
    name: '',
    level: 0,
    game: '',
    maxPlayers: 0,
    leaderPlayerId: "",
    players: []
  };

  const state = reactive({
    ...initialState,
  });

  const rules = {
    name:           { required, minLength: minLength(5) },
    level:          { required, numeric },
    game:           { required },
    maxPlayers:     { required, numeric, between: between(2, 11) },
    leaderPlayerId: { required },
    players:        { required }
  };

  const v$ = useVuelidate(rules, state);

  onMounted(async () => {
    await teamsStore.getAll;
    await playersStore.getAll;
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TeamRequestDto = {
      name: "",
      level: 0,
      game: "",
      maxPlayers: 0,
      leaderPlayerId: "",
      players: []
    };

    if (result) {
      request.name           = state.name;
      request.level          = state.level;
      request.game           = state.game;
      request.maxPlayers     = state.maxPlayers;
      request.leaderPlayerId = state.leaderPlayerId;
      request.players        = toRaw(state.players);
      
      await teamsStore.addTeam(request);
      await teamsStore.getAll;
      clear();
    }
    else alert("Validation form failed!");
  }

  function clear() {
    v$.value.$reset();
    state.name           = "";
    state.level          = 0;
    state.game           = "";
    state.maxPlayers     = 0;
    state.leaderPlayerId = "";
    state.players        = [];
  }
</script>
