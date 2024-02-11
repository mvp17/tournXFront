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
                type="password"
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
    import { required, email } from '@vuelidate/validators';
    import { useUserStore } from '../stores/userStore';
    import { VuelidateError } from '../../../core/interfaces/VuelidateError';
    import { router } from '../../../plugins/router';
    import { NewUserDto } from '../models/newUserDto';

    const userStore = useUserStore();

    const initialState = {
        username: '',
        email: '',
        password: '',
    };

    const state = reactive({...initialState,});

    const rules = {
        username: { required },
        email: { required, email },
        password: { required },
    };

    const v$ = useVuelidate(rules, state);

    async function submit() {
        const result = await v$.value.$validate();
        const request: NewUserDto = { username: "", email: "", password: "" };
        if (result) {
            request.username = state.username;
            request.email = state.email;
            request.password = state.password;
            userStore.registerPlayer(request);
            router.push('/');
        }
        else alert("Validation form failed!");
    }

    function clear() {
        v$.value.$reset();
        state.email = "";
        state.username = "";
        state.email = "";
    }
</script>
