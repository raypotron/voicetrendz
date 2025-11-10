import axios, { AxiosInstance } from 'axios';

const token = document
    .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
    ?.getAttribute('content');

const instance: AxiosInstance = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token ?? '',
        Accept: 'application/json',
    },
});


export default instance;