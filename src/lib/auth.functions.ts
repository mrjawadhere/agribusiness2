import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type UserRole = "admin" | "consultant" | "farmer" | "student" | "company";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

// Mock session for demonstration. In a real app, this would read from a secure cookie or Supabase.
export const getSession = createServerFn({ method: "GET" })
  .handler(async () => {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real implementation, we would check process.env for secrets
    // and use context.supabase or similar to verify the user.
    
    const session: UserSession = {
      id: "user_123",
      name: "Tariq Khan",
      email: "tariq@agribusiness.pk",
      role: "farmer", // Default mock role
      verified: true
    };
    
    return session;
  });

export const updateRole = createServerFn({ method: "POST" })
  .inputValidator((role: unknown) => {
    const roleSchema = z.enum(["admin", "consultant", "farmer", "student"]);
    return roleSchema.parse(role);
  })
  .handler(async ({ data: role }) => {
    // This would typically update the user_roles table in Supabase
    console.log(`Updating user role to: ${role}`);
    return { success: true, newRole: role };
  });
