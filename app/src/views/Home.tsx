import { useEffect } from "react";
import { agentsStore } from "@/store/agentsStore";
import { useStore } from "zustand";

export default function Home() {
  const useAgentsStore = useStore(agentsStore);

  // const generatedCode = JSON.parse(useAgentsStore.generations[0]?.resultCode)
  //   .code.replace(/\\n/g, "\n")
  //   .replace(/\\"/g, '"');

  useEffect(() => {
    useAgentsStore.fetchGenerations();
  }, []);
  return (
    <div onClick={() => console.log(useAgentsStore.generations)}>Home</div>
  );
}
