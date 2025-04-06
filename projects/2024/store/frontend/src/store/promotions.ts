import type { InjectionKey } from "vue";
import { Store } from "vuex";
import type { Module } from "vuex";
import { getPromotions } from "@/api";

// Define your typings for the store state
export interface PromotionListState {
  promotionsList: Promotion[];
  promotionsLoading: boolean;
  promotionsError: string | null;
}

// Define the module
const promotionListModule: Module<PromotionListState, any> = {
  namespaced: false,
  //state
  state() {
    return {
      promotionsList: [],
      promotionsLoading: false,
      promotionsError: null,
    };
  },

  //mutations czyli setters
  mutations: {
    setPromotionList(state, newPromotions) {
      state.promotionsList = newPromotions;
    },
    setPromotionListLoading(state, newPromotionsLoading) {
      state.promotionsLoading = newPromotionsLoading;
    },
    setPromotionListError(state, newPromotionsError) {
      state.promotionsError = newPromotionsError;
    },
  },

  //getters
  getters: {
    getPromotionList(state) {
      return state.promotionsList;
    },
  },

  // tu zapytania do serwera z pomocą naszego api
  actions: {
    fetchPromotions({ state, commit }) {
      // najpierw ustawiamy stan ładowania na true (czyli dane się ładują, teraz mógłby się pokazywać loader)

      commit("setPromotionListLoading", true); // potem wywołujemy funkcję z api, która // odbiera dane z serwera (poprzez axios) i ustawia listę promocji w store // w razie błędu ustawia error w store (catch) // niezależnie od błędu lub jego braku (finally), kończy loading

      getPromotions()
        .then((data: any) => {
          commit("setPromotionList", data);
        })
        .catch((error) => {
          commit("setPromotionListError", "server error!!!");
        })
        .finally(() => {
          commit("setPromotionListLoading", false);
        });
    },
  },
};

const promotionListStoreKey: InjectionKey<Store<PromotionListState>> = Symbol();
export { promotionListModule, promotionListStoreKey };
