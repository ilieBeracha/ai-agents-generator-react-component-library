import { create } from "zustand";
import { getGeneratedComponents } from "@/services/agentsService";
import { GenerationsInDB } from "@/types/agent";
interface AgentsStore {
  generations: GenerationsInDB[];
  fetchGenerations: () => Promise<void>;
}

export const agentsStore = create<AgentsStore>((set) => ({
  generations: [],
  fetchGenerations: async () => {
    const generations = await getGeneratedComponents();
    set({ generations });
  },
}));
