import {type Accessor, createContext, useContext} from "solid-js";
import type {RoleId} from "@/content/roles";

export interface RoleContextValue {
    role: Accessor<RoleId | null>;
    locked: Accessor<boolean>;
    setRole: (next: RoleId | null) => void;
    /** Reads the lock, so a link built inside JSX follows it. */
    pathFor: (role: RoleId | null, hash?: string) => string;
}

export const RoleContext = createContext<RoleContextValue>();

export const useRole = () => {
    const value = useContext(RoleContext);
    if (!value) throw new Error("useRole must be used inside RoleProvider");
    return value;
};
