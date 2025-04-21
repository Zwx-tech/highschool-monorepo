import type { Module } from "vuex";
import { getFilteredProducts } from "@/api";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const productModule: Module<ProductState, any> = {
  namespaced: true,

  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  mutations: {
    setProducts(state, products: Product[]) {
      state.products = products;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchProducts({ commit }, params?: SearchParams) {
      console.log("first");
      commit("setLoading", true);
      commit("setError", null);

      try {
        const products = await getFilteredProducts(params);
        commit("setProducts", products);
      } catch (error) {
        commit("setError", "Failed to fetch products");
      } finally {
        commit("setLoading", false);
      }
    },
  },

  getters: {
    getProducts(state) {
      return state.products;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
};

export default productModule;
