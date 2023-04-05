import axios from "axios";

const baseUrl = '/scores';

const submitHighScore = async (round_times, player_name, cookie_id, token) => {
    const response = await axios.post(baseUrl, {
        token,
        cookie_id,
        player_name,
        round_times
    });

    return response.data.approved;
}

const getTop50 = async (cookie_id = null) => {
    const request = axios.get(baseUrl, {
        params: {
            cookie_id
        }
    });
    const response = await request;
    return response.data;
}

export default { submitHighScore, getTop50 }