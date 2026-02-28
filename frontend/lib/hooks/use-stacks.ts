import { useStacksContext, Network as ProviderNetwork } from "@/app/components/providers/stacks-provider";

export type Network = ProviderNetwork;

export function useStacks() {
  return useStacksContext();
}
