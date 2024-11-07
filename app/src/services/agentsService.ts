import { endpoint } from "@/globals";
import { axiosInstance } from "./requestService";

export async function generateComponent(
  componentType: string,
  description: string
) {
  const response = await axiosInstance.post(
    `${endpoint.AGENTS}/generate-component`,
    {
      componentType,
      description,
    }
  );
  return response.data;
}
