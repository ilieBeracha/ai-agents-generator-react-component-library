import { endpoint } from "@/globals";
import { axiosInstance } from "@/services/requestService";
import { User } from "@/types/User";

export async function login(user: Partial<User>) {
  const response = await axiosInstance.post(`${endpoint.AUTH}/login`, {
    email: user.email,
    password: user.password,
  });

  return response.data;
}

export async function register(user: User) {
  const response = await axiosInstance.post(`${endpoint.AUTH}/register`, user);
  return response.data;
}
