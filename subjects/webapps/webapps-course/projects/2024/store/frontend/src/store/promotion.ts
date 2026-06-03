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
      // Start loading
      commit("setPromotionLoading", true);
      state.promotionLoading = true;

      getPromotion(promotionId)
        .then((promotionData: any) => {
          commit("setPromotion", promotionData);

          const productIds = promotionData?.items;
          if (!productIds || !Array.isArray(productIds)) {
            return;
          }

          const productPromises = productIds.map((productId) => getProduct(productId));
          return Promise.all(productPromises);
        })
        .then((products) => {
          if (products) {
            commit("setPromotionProducts", products);
          }
        })
        .catch((error) => {
          console.error("Error fetching promotion or products", error);
          commit("setPromotionError", "server error!!!");
        })
        .finally(() => {
          commit("setPromotionLoading", false);
          state.promotionLoading = false;
        });
    },
  },
};

const promotionStoreKey: InjectionKey<Store<PromotionState>> = Symbol();

export { promotionModule, promotionStoreKey };
