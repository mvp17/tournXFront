<template>
    <div>
    <h1>Who are you?</h1>
    <div class="card-container">
      <div class="card">
        <div class="card-content">
          <h2>Player</h2>
          <p>Login here if you are a player</p>
        </div>
        <button @click="selectPlayer">Go to login</button>
      </div>
      <div class="card">
        <div class="card-content">
          <h2>Tournament master</h2>
          <p>Login here if you are a tournament master</p>
        </div>
        <button @click="selectTournamentMaster">Go to login</button>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
    import { useUserStore } from '../../users/stores/userStore';
    import { router } from '../../../plugins/router/router';

    const userStore = useUserStore;
    export default {
        methods: {
            selectPlayer() {
                userStore.getUser.role = "PLAYER";
                router.push("/home");
            },
            selectTournamentMaster() {
                userStore.getUser.role = "TOURNAMENT MASTER";
                router.push("/home");
            }
        }
    }
</script>

<style scoped>
    .card-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    }

    .card {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
    }

    .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .card-content {
    text-align: center;
    margin-bottom: 10px;
    }

    button {
    width: 100%;
    padding: 8px 0;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }

    button:hover {
    background-color: #0056b3;
    }
</style>
