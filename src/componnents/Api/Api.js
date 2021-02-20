import axios from 'axios';

let api = axios.create({
    headers:{
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        "Authorization": process.env.REACT_APP_BEARER
    }
})


export default api;