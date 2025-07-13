
import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "./features/counter/counterSlice"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist'
import storage from "./storage"
import { baseApi } from "./api/baseApi";

const persistOptions = {
    key: "counter",
    storage,
}

const persistedCounter = persistReducer(persistOptions, counterSlice.reducer);

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: persistedCounter,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(baseApi.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore["dispatch"]