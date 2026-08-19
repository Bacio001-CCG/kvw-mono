"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { api } from "@/lib/api";
import type { AdminPermission, AuthMe } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";

type AuthContextValue = {
    me: AuthMe | null;
    loading: boolean;
    can: (permission: AdminPermission) => boolean;
    refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [me, setMe] = useState<AuthMe | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        const data = await api<AuthMe>("/permissions/me");
        setMe(data);
    };

    useEffect(() => {
        refresh()
            .catch(() => setMe(null))
            .finally(() => setLoading(false));
    }, []);

    const can = (permission: AdminPermission) => hasPermission(me?.permissions, permission);

    return (
        <AuthContext.Provider value={{ me, loading, can, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return value;
}
