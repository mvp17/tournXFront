import http from '../../../http-common';
import { defineStore } from 'pinia';
import { User } from '../models/user';
import { NewUserDto } from '../models/newUserDto';
import { LoginDto } from '../models/loginDto';
import { piniaInstance } from '../../../pinia';

export const useUserStore = defineStore('users', {
  state: () => ({
    user: { username: "", email: "", role: "", token: "" } as User,
  }),
  getters: {
    getUser(state) {
      return state.user
    }
  },
  actions: {
    async registerPlayer(newPlayer: NewUserDto) {
      const data = await http.post('/player/register', newPlayer);
      this.user.email = data.data.email;
      this.user.token = data.data.token;
      this.user.username = data.data.username;
      //this.user.role = "PLAYER";
    },
    async loginPlayer(currentPlayer: LoginDto) {
      const data = await http.post("/player/login", currentPlayer);
      this.user.email = data.data.email;
      this.user.token = data.data.token;
      this.user.username = data.data.username;
      //this.user.role = "PLAYER";
    },
    async registerTournamentMaster(newTournamentMaster: NewUserDto) {
      const data = await http.post('/tournamentMaster/register', newTournamentMaster);
      this.user.email = data.data.email;
      this.user.token = data.data.token;
      this.user.username = data.data.username;
      //this.user.role = "TOURNAMENT MASTER";
    },
    async loginTournamentMaster(currentTournamentMaster: LoginDto) {
      const data = await http.post("/tournamentMaster/login", currentTournamentMaster);
      this.user.email = data.data.email;
      this.user.token = data.data.token;
      this.user.username = data.data.username;
      //this.user.role = "TOURNAMENT MASTER";
    }
  },
})(piniaInstance);
