<template>
  <h1>Sign In {{ role }}</h1>
  <div class="center-container">
    <v-card>
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
          type="password"
          v-model="state.password"
          :error-messages="(v$.password.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Password"
          required
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
        ></v-text-field>
        
        <v-btn color="primary" class="me-4" @click="router.push('/register');"> Sign Up </v-btn>
        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-card>
  </div>
</template>


<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { useUserStore } from '../stores/userStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { router } from '../../../plugins/router/router';
  import { LoginDto } from '../models/loginDto';

  const userStore = useUserStore;
  const role =  useUserStore.getUser.role;

  const initialState = {
    username: '',
    password: '',
  };
  
  const state = reactive({...initialState,});

  const rules = {
    username: { required },
    password: { required },
  };

  const v$ = useVuelidate(rules, state);

  async function submit() {
    const result = await v$.value.$validate();
    const request: LoginDto = { username: "", password: "" };
    if (result) {
      request.username = state.username;
      request.password = state.password;

      if (userStore.getUser.role === "PLAYER") {
        await userStore.loginPlayer(request);
      }
      else if (userStore.getUser.role === "TOURNAMENT MASTER") {
        await userStore.loginTournamentMaster(request);
      }
      router.push('/home');
    }
    else alert("Validation form failed!");
  }

  function clear() {
    v$.value.$reset();
    state.username = "";
    state.password = "";
  }
</script>

<style>
  .center-container {
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center; /* Vertically center */
    height: 100vh; /* Adjust as needed */
  }
</style>
