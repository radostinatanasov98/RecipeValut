const API_CONNECTION = () => {
    "http://localhost:42478/"
};

export const createRecipe = (Id, Name, ImageUrl, Description, Instructions, TypeId) => {
    fetch(`http://localhost:42478/api/Recipes/PostRecipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id, Name, ImageUrl, Description, Instructions, TypeId})
    })
    .then(res => res.json())
    .then(result =>  {
        return result;
    });
}

export const getAllRecipes = () => {
    return fetch(`http://localhost:42478/api/Recipes/GetRecipes`, {
        method: 'GET',
    })
    .then(res => res.json());
};

export const getRecipeById = (recipeId) => {
    return fetch(`http://localhost:42478/api/Recipes/${recipeId}`, { method: 'GET' })
        .then(res => res.json())
};
