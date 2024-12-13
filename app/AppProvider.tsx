"use client";

import { SessionProvider } from "next-auth/react";
import { Providers } from "./GlobalRedux/provider";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
};

export default AppProvider;
