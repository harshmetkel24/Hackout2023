import axios from 'axios'

const API_URI = "https://pms-hackout23.onrender.com";
// const API_URI = "https://onlinejudge-ewmi.onrender.com";

export const Login = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/login`,data,{ withCredentials: true});
        return response.data;
    } catch (error) {
        console.log('Error while login', error.message);
    }
}