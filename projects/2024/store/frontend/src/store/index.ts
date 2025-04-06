import { createStore, useStore, type Module } from "vuex";
import { promotionListModule, promotionListStoreKey } from "./promotions";
import { promotionModule, promotionStoreKey } from "./promotion";
import type { App } from "vue";

export function storeSetup(app: App) {
  const store = createStore({
    modules: {
      promotionListModule,
      promotionModule,
    },
  });
  app.use(store);
}
