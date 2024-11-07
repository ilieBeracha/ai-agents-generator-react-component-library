import { useEffect } from "react";
import { agentsStore } from "@/store/agentsStore";
import { useStore } from "zustand";
import { DynamicComponentWrapper } from "@/components/DynamicComponentWrapper";

export default function Home() {
  const useAgentsStore = useStore(agentsStore);

  useEffect(() => {
    useAgentsStore.fetchGenerations();
  }, []);

  const generations = useAgentsStore.generations;

  return (
    <div>
      {generations.length > 0 ? (
        <DynamicComponentWrapper generations={generations} />
      ) : (
        <p>Loading component...</p>
      )}
    </div>
  );
}
