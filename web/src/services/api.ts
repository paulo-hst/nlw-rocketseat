import axios from 'axios'; // conecta o frontend com o backend  

const api = axios.create({
    baseURL: 'http://localhost:3333', // define uma base URL do backend, para evitar utilização do localhost
});

export default api;