import axios from 'axios';

let api = axios.create({
    headers:{
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        "Authorization": process.env.REACT_APP_BEARER
    }
})

/**
 * https://id.twitch.tv/oauth2/authorize?client_id=0o12o2olcnvy7akkfjjg1qdrg4k58q&redirect_uri=http://localhost&response_type=token
 */

export default api;