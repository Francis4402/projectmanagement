"use client"

import { ReactNode } from "react"
import StoreProviders from "./StoreProviders"
import UserProvider from "@/app/context/UserContext"


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProviders>
            <UserProvider>
                {children}
            </UserProvider>
        </StoreProviders>
    )
  }
  
  export default Providers