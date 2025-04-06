import type { InjectionKey } from "vue";
import { Store } from "vuex";
import type { Module } from "vuex";
import { getProduct, getPromotion } from "@/api";

// Define your typings for the store state
export interface PromotionState {
  promotionsObject: Promotion | null;
  promotionProducts: Product[];
  promotionLoading: boolean;
  promotionError: string | null;
}

// Define the module
const promotionModule: Module<PromotionState, any> = {
  //state
  state() {
    return {
      promotionProducts: [],
      promotionsObject: null,
      promotionLoading: false,
      promotionError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    setPromotion(state, newPromotions) {
      state.promotionsObject = newPromotions;
    },
    setPromotionLoading(state, newPromotionsLoading) {
      state.promotionLoading = newPromotionsLoading;
    },
    setPromotionError(state, newPromotionsError) {
      state.promotionError = newPromotionsError;
    },
    setPromotionProducts(state, newPromotionProducts) {
      state.promotionProducts = newPromotionProducts;
    },
  },

  //getters
  getters: {
    getPromotion(state) {
      return state.promotionsObject;
    },
    getPromotionLoading(stare) {
      return stare.promotionLoading;
    },

    getPromotionProducts(state) {
      if (state.promotionsObject === null) {
        return [];
      }
      if (state.promotionProducts.length === 0 && state.promotionsObject?.items.length !== 0) {
      }
      return state.promotionProducts;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    fetchPromotion({ state, commit, getters }, promotionId: number) {
      // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)
      commit("setPromotionLoading", true); // potem wywołujemy funkcję z api, która // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store // w razie błędu ustawia error w store (catch) // niezależnie od błędu lub jego braku (finally), kończy loading

      state.promotionLoading = true;
      getPromotion(promotionId)
        .then((data: any) => {
          commit("setPromotion", data);
        })
        .catch((error) => {
          commit("setPromotionError", "server error!!!");
        })
        .finally(() => {
          commit("setPromotionLoading", false); // potem wywołujemy funkcję z api, która // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store // w razie błędu ustawia error w store (catch) // niezależnie od błędu lub jego braku (finally), kończy loading
          state.promotionLoading = false;
        });
    },

    fetchPromotionProducts({ state, commit, getters }) {
      if (state.promotionsObject === null) {
        return;
      }
      const productIds = state.promotionsObject.items;
      console.log(productIds);
      const productPromises = productIds.map((productId) => getProduct(productId));
      return Promise.all(productPromises)
        .then((products) => {
          commit("setPromotionProducts", products);
        })
        .catch((error) => {
          commit("setPromotionError", "server error!!!");
        })
        .finally(() => {
          commit("setPromotionLoading", false);
        });
    },
  },
};

const promotionStoreKey: InjectionKey<Store<PromotionState>> = Symbol();

export { promotionModule, promotionStoreKey };
