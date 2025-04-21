import { createStore, useStore, type Module } from "vuex";
import { promotionListModule, promotionListStoreKey } from "./promotions";
import { promotionModule, promotionStoreKey } from "./promotion";
import type { App } from "vue";
import userModule from "./user";
import productModule from "./product";

export function storeSetup(app: App) {
  const store = createStore({
    modules: {
      promotionListModule,
      promotionModule,
      userModule,
      product: productModule,
    },
  });
  app.use(store);
}
