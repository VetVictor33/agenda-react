import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { useLocalStorage } from 'react-use'
import { IContactArray, IUser } from "./interfaces";

export default function Root() {
    const [token, setToken, removeToken] = useLocalStorage<WindowLocalStorage>('token');
    const [user, setUser] = useState<IUser>();
    const [contacts, setContacts] = useState<IContactArray>([]);

    const tokenMemo = useMemo(() => ({
        token, setToken, removeToken
    }), [token, setToken, removeToken]);

    const userMemo = useMemo(() => ({
        user, setUser
    }), [user, setUser]);

    const contactsMemo = useMemo(() => ({
        contacts, setContacts
    }), [contacts, setContacts]);



    return (
        <UserContext.Provider value={{
            ...tokenMemo, ...userMemo, ...contactsMemo
        }}>
            <Outlet />
        </UserContext.Provider>
    )
}