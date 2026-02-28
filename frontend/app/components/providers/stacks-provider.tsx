"use client";

import { createContext, useContext, ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import { showConnect } from "@stacks/connect";
import { appDetails, userSession } from "@/lib/stacks-session";

export type Network = "mainnet" | "testnet" | "disconnected";

type StacksUserData = {
  profile?: {
    stxAddress?: {
      mainnet?: string;
      testnet?: string;
    };
  };
};

const getAppIcon = () => {
  if (typeof window === "undefined") return appDetails.icon;
  try {
    return new URL(appDetails.icon, window.location.origin).toString();
  } catch {
    return appDetails.icon;
  }
};

type StacksContextType = {
  address: string | null;
  connect: () => void;
  disconnect: () => void;
  isReady: boolean;
  isConnected: boolean;
  network: Network;
};

const StacksContext = createContext<StacksContextType | null>(null);

export function StacksProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<StacksUserData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function hydrateSession() {
      if (userSession.isSignInPending()) {
        const data = await userSession.handlePendingSignIn();
        if (!cancelled) setUserData(data);
      } else if (userSession.isUserSignedIn()) {
        setUserData(userSession.loadUserData());
      }
      if (!cancelled) setIsReady(true);
    }

    hydrateSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;

    showConnect({
      userSession,
      appDetails: { ...appDetails, icon: getAppIcon() },
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
    });
  }, []);

  const disconnect = useCallback(() => {
    userSession.signUserOut();
    setUserData(null);
  }, []);

  const network: Network = useMemo(() => {
    if (!userData?.profile?.stxAddress) return "disconnected";
    if (userData.profile.stxAddress.mainnet) return "mainnet";
    if (userData.profile.stxAddress.testnet) return "testnet";
    return "disconnected";
  }, [userData]);

  const address = useMemo(() => {
    if (!userData?.profile?.stxAddress) return null;
    return (
      userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet
    );
  }, [userData]);

  const value = {
    address,
    connect,
    disconnect,
    isReady,
    isConnected: !!userData,
    network,
  };

  return (
    <StacksContext.Provider value={value}>
      {children}
    </StacksContext.Provider>
  );
}

export function useStacksContext() {
  const context = useContext(StacksContext);
  if (!context) {
    throw new Error("useStacksContext must be used within a StacksProvider");
  }
  return context;
}
