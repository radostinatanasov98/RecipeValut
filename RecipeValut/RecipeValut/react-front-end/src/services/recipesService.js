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
    .then(res => res.json());
}

export const updateRecipe = (Id, Name, ImageUrl, Description, Instructions, TypeId) => {
    fetch(`http://localhost:42478/api/Recipes/Edit/${Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id, Name, ImageUrl, Description, Instructions, TypeId})
    })
    .then(res => res.json());
}

export const deleteRecipe = (Id) => {
    fetch(`http://localhost:42478/api/Recipes/Delete/${Id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id})
    });
}

export const getAllRecipes = () => {
    return fetch(`http://localhost:42478/api/Recipes/GetRecipes`, {
        method: 'GET',
    }).then(res => res.json());
};

export const getRecipeById = (recipeId) => {
    return fetch(`http://localhost:42478/api/Recipes/GetRecipeById/${recipeId}`, { method: 'GET' })
        .then(res => res.json())
};

export const likeRecipe = (UserId, RecipeId) => {
    fetch(`http://localhost:42478/api/Recipes/Like/${UserId}&${RecipeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UserId, RecipeId})
    })
    .then(res => res.json());
};

export const dislikeRecipe = (UserId, RecipeId) => {
    fetch(`http://localhost:42478/api/Recipes/Dislike/${UserId}&${RecipeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UserId, RecipeId})
    })
    .then(res => res.json());
};

export const getRelation = (userId, recipeId) => {
    return fetch(`http://localhost:42478/api/Recipes/${userId}&${recipeId}`, { method: 'GET' })
        .then(res => res.json());
};

export const getLikedRecipes = (userId) => {
    return fetch(`http://localhost:42478/api/Recipes/GetLikedRecipes/${userId}`, { method: 'GET' })
    .then(res => res.json())
}

export const validateRecipe = (Id, Name, ImageUrl, Description, Instructions, TypeId) => {
    if (Id == '' || Name == '' || ImageUrl == '' || Description == '' || Instructions == '' || TypeId == '' || TypeId < 1 || TypeId > 3) {
        alert("Oops. It seems you have entered invalid informaton.");
        return false;
    }

    return true;
};