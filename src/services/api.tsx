import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: 'https://api-contacts.pedagogico.cubos.academy',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export async function apiAuthorizationHeaders() {
    const headers: AxiosRequestConfig = {
        headers: { 'Authorization': `Bearer ${'token'}` }
    }
    return headers
}