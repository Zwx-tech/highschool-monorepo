import type { Module } from "vuex";
import { getUser, loginUser } from "@/api";
import type { AxiosError } from "axios";

export interface UserState {
  user: { email: string; token: string } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const userModule: Module<UserState, any> = {
  namespaced: false,

  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setError(state, error) {
      state.error = error;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  actions: {
    async login({ commit }, { email, password }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const response = await loginUser({ email, password });
        commit("setUser", { email });
      } catch (error) {
        commit(
          "setError",
          (error as AxiosError<{ message: string }>).response?.data?.message || "An error occurred"
        );
      } finally {
        commit("setLoading", false);
      }
    },
    async autoAuth({ commit }) {
      const user = await getUser();
      if (user) {
        commit("setUser", user);
      } else {
        commit("logout");
      }
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setIsAuthenticated", false);
      //* Clear the cookie
      //* I rly wanted to make this via backend but it refuses to work so I had to do it here :((
      //* Also it's code from stackoverflow >>>> chatgpt
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUser(state) {
      return state.user;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
};

export default userModule;
