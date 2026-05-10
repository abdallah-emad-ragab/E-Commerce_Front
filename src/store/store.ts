import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistSlice from "./wishlist/wishlistSlice";
import authSlice from "./auth/authSlice";
import orderSlice from "./order/orderSlice";

const rootPersistConfig = {
    key: "root",
    storage, // defaults to localStorage for web
    whitelist: ["cart", "auth"]
}
const authPersistConfig = {
    key: "auth",
    storage, // defaults to localStorage for web
    whitelist: ["user", "accessToken"]
}
const cartPersistConfig = {
    key: "cart",
    storage, // defaults to localStorage for web
    whitelist: ["items"] // To persist only the items object inside cart slice
}

const rootPersistReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    categories: categoriesReducer,
    products: productsReducer,
    cart: persistReducer(cartPersistConfig, cartReducer), // Nested persistReducer
    wishlist: wishlistSlice,
    order: orderSlice,
});
const persistedReducer = persistReducer(rootPersistConfig, rootPersistReducer);

const store = configureStore({
    reducer: persistedReducer,
    // Addon from Gemini to fix a problem
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // هنا بنقول للبرنامج: "تجاهل فحص هذه الأوامر لأنها طبيعية من المكتبة"
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER", "persist/FLUSH", "persist/PAUSE", "persist/PURGE"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store, persistor };