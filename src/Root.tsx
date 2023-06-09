import { useMemo, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { useLocalStorage } from 'react-use'

export default function Root() {
    const [user, setUser] = useLocalStorage<WindowLocalStorage>('user');
    const [token, setToken, removeToken] = useLocalStorage<WindowLocalStorage>('token');

    const value = useMemo(() => ({
        user, setUser, token, setToken, removeToken
    }), [user, setUser, token, setToken, removeToken]);

    return (
        <UserContext.Provider value={value}>
            <Outlet />
        </UserContext.Provider>
    )
}