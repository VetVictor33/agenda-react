import { useState } from 'react'
import { User } from '../contexts/userContext';

export default function useUserProvider() {
    const [userData, setUserData] = useState<User>();

    return {
        userData,
        setUserData
    }
}