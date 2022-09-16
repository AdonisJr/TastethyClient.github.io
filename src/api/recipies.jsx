import axios from 'axios';

export const get = async(accessToken) =>{
    return await axios.get('/api/recipes/favorite',
    {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export const add = async(accessToken, recipe_id) =>{
    return await axios.post('/api/recipes/favorite',{ recipe_id },
    {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export const remove = async(recipeDetails) =>{
    
    return await axios.delete(`/api/recipes/favorite?accessToken=${'Bearer '+recipeDetails.accessToken}&recipe_id=${recipeDetails.recipe_id}` );
}