const API_CONNECTION = () => {
    "http://localhost:42478/"
};

export const createRecipe = (Id, Name, ImageUrl, Description, Instructions) => {
    let response = fetch(`http://localhost:42478/api/Recipes/PostRecipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id, Name, ImageUrl, Description, Instructions})
    })
    .then(res => res.json());

    console.log(Name);
    return response;
}