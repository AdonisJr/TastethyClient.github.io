import axios from 'axios';

export const getFavoriteRecipes = async(accessToken) =>{
    return await axios.get('http://localhost:3001/api/recipes/favorite',
    {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export const addFavoriteRecipes = async(accessToken, recipe_id) =>{
    return await axios.post('http://localhost:3001/api/recipes/favorite',{recipe_id},
    {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });
}

