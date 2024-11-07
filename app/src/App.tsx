import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Auth from "./views/Auth";
import { authStore } from "@/store/authStore";
import { useStore } from "zustand";
import { useEffect } from "react";

function App() {
  const useAuthStore = useStore(authStore);

  useEffect(() => {
    useAuthStore.checkAuth();
  }, [useAuthStore.isLoggedIn]);

  return (
    <div style={{ minHeight: "100vh", width: "100vw" }}>
      <Routes>
        {useAuthStore.isLoggedIn ? (
          <Route path="*" element={<Home />} />
        ) : (
          <Route path="*" element={<Auth />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
