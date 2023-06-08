import { createContext, ReactNode } from "react";
import useUserProvider from "../hooks/useUserProvider";

interface UserProviderProps {
    children: ReactNode;
}

export interface User {
    userData: {
        id: number,
        name: string,
        email: string,
    },
    setUserData: (userData: {
        id: number,
        name: string,
        email: string,
    }) => void;
}


export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider(props: UserProviderProps) {
    const userProvider = useUserProvider();

    return (
        <UserContext.Provider value={userProvider}>
            {props.children}
        </UserContext.Provider>
    )
}