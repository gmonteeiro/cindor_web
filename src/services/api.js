// instalar o axios para utilizar API. npm install axios

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3sis.com.br/SUIApi/api/ProgramacaoCientifica?codEve=3',
})

export default api;