// instalar o axios para utilizar API. npm install axios

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3sis.com.br/SUIApi/api/ProgramacaoCientifica',
})

export default api;