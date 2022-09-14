import axios from 'axios';

export const register = async(credentials) =>{
    return await axios.post('http://localhost:3001/api/register', credentials);
}

export const login = async(credentials) =>{
     return await axios.post('http://localhost:3001/api/login', credentials);
}

export const getUserDetails = async(accessToken) =>{
    return await axios.get('http://localhost:3001/api/user',{
        headers:{
        Authorization: `Bearer ${accessToken}`
    }
})
}