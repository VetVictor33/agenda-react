import axios from 'axios';
import { getToken } from '../utils/autentication';

export const api = axios.create({
    baseURL: 'https://api-contacts.pedagogico.cubos.academy',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export async function privatePostRequest(path: string, body: object) {
    const token = getToken();

    try {

        const response = api.post(path, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return response

    } catch (error) {
        return error
    }
}