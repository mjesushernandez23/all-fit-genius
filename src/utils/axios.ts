import axios from 'axios';

export const myFetch = axios.create({ baseURL: '/api/' });
