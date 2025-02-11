import { apiRequest } from "./queryClient";
import type { User } from "@shared/schema";

export function setStoredUsername(username: string) {
  localStorage.setItem("username", username);
}

export function getStoredUsername(): string | null {
  return localStorage.getItem("username");
}

export async function loginUser(username: string, accountType: string): Promise<User> {
  const res = await apiRequest("POST", "/api/auth/login", { username, accountType });
  const user = await res.json();
  setStoredUsername(username);
  return user;
}
