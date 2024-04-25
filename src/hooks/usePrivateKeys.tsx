import { create } from "zustand";

interface PrivateKeysStore {
  privateKeys: string[];
  setPrivateKeys: (privateKeys: string[]) => void;
}

const usePrivateKeys = create<PrivateKeysStore>((set) => ({
  privateKeys: [],
  setPrivateKeys: (privateKeys) => set({ privateKeys }),
}));

export default usePrivateKeys;
