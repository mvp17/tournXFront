import { useUserStore } from "../../modules/users/stores/userStore";

export function authGuard () {
    const userStore = useUserStore();
    const isAuth = userStore.getUser.token !== "";
    if (!isAuth) return { name: 'Login'}
}
  
export function playerGuard () {
    const userStore = useUserStore();
    const role = userStore.getUser.role;
    if (role !== "PLAYER") return { name: 'Login' }
}
  
export function tournamentMasterGuard () {
    const userStore = useUserStore();
    const role = userStore.getUser.role;
    if (role !== "TOURNAMENT MASTER") return { name: 'Login' }
}
