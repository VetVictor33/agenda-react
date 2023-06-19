import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { IUserContext } from '../interfaces';

export default function useUser() {
    return useContext<IUserContext>(UserContext);
}