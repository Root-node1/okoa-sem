"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react";
import { UserRole, UserProfile } from "@/types/user";
import { MOCK_STUDENT, MOCK_LECTURER } from "@/data/mock-users";

interface AuthRoleContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  isStudent: boolean;
  isLecturer: boolean;
}

const STORAGE_KEY = "okoa_active_role";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("okoa-role-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("okoa-role-change", callback);
  };
}

function getSnapshot(): UserRole {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "LECTURER" || stored === "STUDENT") {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return "STUDENT";
}

function getServerSnapshot(): UserRole {
  return "STUDENT";
}

const AuthRoleContext = createContext<AuthRoleContextType>({
  role: "STUDENT",
  user: MOCK_STUDENT,
  setRole: () => {},
  toggleRole: () => {},
  isStudent: true,
  isLecturer: false,
});

export function AuthRoleProvider({ children }: { children: React.ReactNode }) {
  const role = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setRole = useCallback((newRole: UserRole) => {
    try {
      localStorage.setItem(STORAGE_KEY, newRole);
      window.dispatchEvent(new Event("okoa-role-change"));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleRole = useCallback(() => {
    const current = getSnapshot();
    const nextRole: UserRole = current === "STUDENT" ? "LECTURER" : "STUDENT";
    setRole(nextRole);
  }, [setRole]);

  const user = role === "LECTURER" ? MOCK_LECTURER : MOCK_STUDENT;

  return (
    <AuthRoleContext.Provider
      value={{
        role,
        user,
        setRole,
        toggleRole,
        isStudent: role === "STUDENT",
        isLecturer: role === "LECTURER",
      }}
    >
      {children}
    </AuthRoleContext.Provider>
  );
}

export function useAuthRole() {
  return useContext(AuthRoleContext);
}
