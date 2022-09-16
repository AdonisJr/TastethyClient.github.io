import axios from 'axios';

export const register = async(credentials) =>{
    return await axios.post('/api/register', credentials);
}

export const login = async(credentials) =>{
     return await axios.post('/api/login', credentials);
}

export const getUserDetails = async(accessToken) =>{
    return await axios.get('/api/user',{
        headers:{
        Authorization: `Bearer ${accessToken}`
    }
})
}