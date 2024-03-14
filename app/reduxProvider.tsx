"use client"

// StoreProvider를 자식요소에 적용

import { PropsWithChildren } from "react";
import StoreProvider from "./storeProvider";

export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>  
  );
}
