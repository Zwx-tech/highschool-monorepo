import type { InjectionKey } from "vue";
import { Store } from "vuex";
import type { Module } from "vuex";
import { getPromotion } from "@/api";

// Define your typings for the store state
export interface PromotionState {
  promotionsObject: Promotion | null;
  promotionLoading: boolean;
  promotionError: string | null;
}

// Define the module
const promotionModule: Module<PromotionState, any> = {
  //state
  state() {
    return {
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
      console.log("Update happend " + newPromotionsLoading);
    },
    setPromotionError(state, newPromotionsError) {
      state.promotionError = newPromotionsError;
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
  },
};

const promotionStoreKey: InjectionKey<Store<PromotionState>> = Symbol();

console.log("promotion store", promotionStoreKey);
export { promotionModule, promotionStoreKey };
