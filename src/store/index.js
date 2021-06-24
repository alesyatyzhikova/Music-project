import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
    toggleLogged(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleLogged');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleLogged');
    },
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleLogged');
      }
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleLogged');
    },
  },
  getters: {
    authModalShow(state) {
      return state.authModalShow;
    },
  },
  modules: {
  },
});
