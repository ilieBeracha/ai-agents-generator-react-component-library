import AuthForm from "@/components/AuthForm";
import AuthHero from "@/components/AuthHero";
import { authStore } from "@/store/authStore";
import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";

export default function Auth() {
  const useAuthStore = useStore(authStore);
  const navigate = useNavigate();

  async function handleAuth(isSignup: boolean, user: Partial<User>) {
    try {
      if (isSignup) {
        await useAuthStore.register(user as User);
      } else {
        await useAuthStore.login(user as User);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <AuthHero />
      <AuthForm handleAuth={handleAuth} />
    </div>
  );
}
