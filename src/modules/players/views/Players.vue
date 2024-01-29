<template>
  <h1>Players</h1>
  <v-row>
    <v-col>
      <form>
        <v-text-field
          v-model="state.username"
          :error-messages="(v$.username.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Username"
          required
          @input="v$.username.$touch"
          @blur="v$.username.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.email"
          :error-messages="(v$.email.$errors as VuelidateError[]).map((e) => e.$message)"
          label="E-mail"
          required
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="(v$.password.$errors as VuelidateError[]).map((e) => e.$message)"
          :type="show ? 'text' : 'password'"
          label="Password"
          required
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          @click:append="show = !show"
        ></v-text-field>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Username</th>
            <th class="text-left">E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in playersList" :key="player.username">
            <td>{{ player.username }}</td>
            <td>{{ player.email }}</td>
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
      show: false,
      playersList: [
        {
          username: 'mvp17',
          email: 'mvp17@udl.cat',
        },
        {
          username: 'abc12',
          email: 'abc12@udl.cat',
        },
        {
          username: 'ujh85',
          email: 'ujh85@udl.cat',
        },
        {
          username: 'rvt96',
          email: 'rvt96@udl.cat',
        },
        {
          username: 'gth7',
          email: 'gth7@udl.cat',
        },
      ],
    };
  },
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, minLength, helpers } from '@vuelidate/validators';
import { usePlayersStore } from '../stores/players';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { VuelidateError } from '../../../core/interfaces/VuelidateError';

const playersStore = usePlayersStore();
const players = computed(() => playersStore.players);

const initialState = {
  username: '',
  email: '',
  password: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  username: { required },
  email: { required, email },
  password: {
    required,
    minLength: minLength(6),
    containsUppercase: helpers.withMessage(
      'The password requires an uppercase',
      (value: string) => {
        return /[A-Z]/.test(value);
      }
    ),
    containsLowercase: helpers.withMessage(
      'The password requires a lowercase',
      (value: string) => {
        return /[a-z]/.test(value);
      }
    ),
    containsNumber: helpers.withMessage(
      'The password requires a number',
      (value: string) => {
        return /[0-9]/.test(value);
      }
    ),
    containsSpecial: helpers.withMessage(
      'The password requires a special character',
      (value: string) => {
        return /[#?!@$%^&*-]/.test(value);
      }
    ),
  },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  //getPlayers();
});

async function submit() {
  const result = await v$.value.$validate();
  const request = {};
  if (result) {
    for (const key of Object.keys(initialState)) {
      request[key] = state[key];
    }
    //playersStore.addPlayer(request);
  }
}

function getPlayers() {
  playersStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
