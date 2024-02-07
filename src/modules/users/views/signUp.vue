<template>
    <h1>Sign Up</h1>
    <v-row>
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
                :counter="10"
                label="Email"
                required
                @input="v$.email.$touch"
                @blur="v$.email.$touch"
            ></v-text-field>
  
            <v-text-field
                v-model="state.password"
                :error-messages="(v$.password.$errors as VuelidateError[]).map((e) => e.$message)"
                :counter="10"
                label="Password"
                required
                @input="v$.password.$touch"
                @blur="v$.password.$touch"
            ></v-text-field> 
            <v-btn color="primary" class="me-4" @click="router.go(-1);"> back </v-btn>
            <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
            <v-btn color="error" @click="clear"> clear </v-btn>
        </form>
    </v-row>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import { computed } from '@vue/reactivity';
    import { useUserStore } from '../stores/userStore';
    import { VuelidateError } from '../../../core/interfaces/VuelidateError';
    import { router } from '../../../plugins/router';

    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const initialState = {
        username: '',
        email: '',
        password: '',
    };

    const state = reactive({...initialState,});

    const rules = {
        username: { required },
        email: { required },
        password: { required },
    };

    const v$ = useVuelidate(rules, state);

    async function submit() {
        const result = await v$.value.$validate();
        const request = {};
        if (result) {
            for (const key of Object.keys(initialState)) {
                request[key] = state[key];
            }
            //userStore.register(request);
            }
        else alert("Validation form failed!");
    }

    function clear() {
        v$.value.$reset();
        for (const [key, value] of Object.entries(initialState)) {
            state[key] = value;
        }
    }
</script>
