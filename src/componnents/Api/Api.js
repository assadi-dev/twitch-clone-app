import axios from 'axios';

let api = axios.create({
    headers:{
        'Client-ID': '0o12o2olcnvy7akkfjjg1qdrg4k58q',
        "Authorization": "Bearer grjg4q0nvldfillofjmwi8au7zczh3"
    }
})

/**
 * https://id.twitch.tv/oauth2/authorize?client_id=0o12o2olcnvy7akkfjjg1qdrg4k58q&redirect_uri=http://localhost&response_type=token
 */

export default api;