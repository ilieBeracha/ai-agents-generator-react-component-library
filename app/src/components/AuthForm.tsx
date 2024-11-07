import { useState } from "react";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import { User } from "@/types/User";
import { useStore } from "zustand";
import { authStore } from "@/store/authStore";

export default function AuthForm({
  handleAuth,
}: {
  handleAuth: (isSignup: boolean, user: Partial<User>) => void;
}) {
  const useAuthStore = useStore(authStore);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleUserAuth = async () => {
    const user: Partial<User> = {};
    setIsLoading(true);
    if (isSignup) {
      user.firstname = firstName;
      user.lastname = lastName;
      user.email = email;
      user.password = password;
    } else {
      user.email = email;
      user.password = password;
    }
    handleAuth(isSignup, user);
    setIsLoading(false);
  };

  const onChangeAuthType = () => {
    setIsSignup(!isSignup);
    useAuthStore.resetError();
    setIsLoading(false);
  };

  return (
    <div className="bg-secondary flex flex-col  px-8 h-full justify-center items-center pb-32">
      <div className="flex flex-col w-2/3">
        <div className="flex flex-col justify-center items-start  mb-8">
          <h1 className="text-4xl font-bold">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
        </div>
        <div className="flex flex-col gap-5 mb-5">
          {isSignup && (
            <div className="grid grid-cols-2 gap-5">
              <BaseInput
                label="First Name"
                placeholder="Type your first name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <BaseInput
                label="Last Name"
                placeholder="Type your last name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}
          <BaseInput
            label="Email"
            placeholder="Type your email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BaseInput
            label="Password"
            placeholder="Type your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <BaseButton
          type="submit"
          onClick={() => {
            handleUserAuth();
          }}
        >
          {isLoading ? "Loading..." : isSignup ? "Sign up" : "Sign in"}
        </BaseButton>
        {useAuthStore.error && (
          <p className="text-red-500 text-sm my-5">{useAuthStore.error}</p>
        )}
        <a
          onClick={() => onChangeAuthType()}
          className="text-sm text-black mt-2"
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </a>
      </div>
    </div>
  );
}
