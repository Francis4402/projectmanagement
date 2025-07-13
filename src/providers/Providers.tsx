"use client"

import { ReactNode } from "react"
import StoreProviders from "./StoreProviders"


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProviders>
            {children}
        </StoreProviders>
    )
  }
  
  export default Providers