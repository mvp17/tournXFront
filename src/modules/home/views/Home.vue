<template>
  <h1>Home</h1>
  <form>
    <v-checkbox
      v-model="state.checkbox"
      :error-messages="(v$.checkbox.$errors as VuelidateError[]).map((e) => e.$message)"
      label="Do you agree?"
      required
      @change="v$.checkbox.$touch"
      @blur="v$.checkbox.$touch"
    ></v-checkbox>

    <v-btn color="success" class="me-4" @click="v$.$validate"> submit </v-btn>
    <v-btn color="error" @click="clear"> clear </v-btn>
  </form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';

  const initialState = {
    checkbox: null,
  };

  const state = reactive({
    ...initialState,
  });

  const rules = {
    checkbox: { required },
  };

  const v$ = useVuelidate(rules, state);

  function clear() {
    v$.value.$reset();
  }
</script>
