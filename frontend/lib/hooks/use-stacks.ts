"use client";

import { useState, useEffect } from "react";

export function useStacks() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    // Basic placeholder for connection logic
    setIsConnected(true);
  };

  const disconnect = () => {
    setIsConnected(false);
  };

  return {
    isConnected,
    connect,
    disconnect,
  };
}
