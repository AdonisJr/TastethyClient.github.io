import axios from "axios";

// GET ALL USER
export const getAll = async(accessToken) =>{
    return await axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}

// Register USER
export const register = async(accessToken, credentials)=>{
    return await axios.post('/user', credentials,
    {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

// UPDATE USER

export const update = async(accessToken, credentials) =>{
    return await axios.put(`/user/${credentials.user_id}`, credentials,
    {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

// DELETE USER

export const remove = async(credentials) =>{
    return await axios.delete(`/user/${credentials.user_id}?accessToken=${'Bearer '+credentials.accessToken}`);
}