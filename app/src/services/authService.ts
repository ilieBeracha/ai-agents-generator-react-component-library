import { endpoint } from "@/globals";
import { axiosInstance } from "@/services/requestService";
import { User } from "@/types/User";

export async function login(email: string, password: string) {
  const response = await axiosInstance.post(`${endpoint.AUTH}/login`, {
    email,
    password,
  });

  return response.data;
}

export async function register(user: User) {
  const response = await axiosInstance.post(`${endpoint.AUTH}/register`, user);
  return response.data;
}
