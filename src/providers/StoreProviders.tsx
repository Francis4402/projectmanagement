"use client"

import { AppStore, makeStore } from "@/redux/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


export default function StoreProviders({children}: {children: ReactNode}) {
    const storeRef = useRef<AppStore>(undefined);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    const persistedStore = persistStore(storeRef.current);
    
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<p className="flex justify-center items-center h-screen">...loading</p>} persistor={persistedStore}>{children}</PersistGate>
        </Provider>
    );
}