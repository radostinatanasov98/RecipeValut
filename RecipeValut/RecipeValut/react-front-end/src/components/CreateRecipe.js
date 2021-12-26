import './CreateRecipe.css';
import * as recipeService from '../services/recipesService.js';

const CreateRecipe = ({id}) => {
    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let Id = id;
        let Name = formData.get('Name');
        let ImageUrl = formData.get('ImageUrl');
        let Description = formData.get('Description');
        let Instructions = formData.get('Instructions');

        console.log(formData);
        console.log(Name);

        var json = JSON.stringify({Id, Name, ImageUrl, Description, Instructions});
        console.log(json);
        recipeService.createRecipe(Id, Name, ImageUrl, Description, Instructions);
    }

    return (
        <>
        <h1 className='createRecipeH1'>Create Recipe</h1>

        <div className='createRecipeContainer'>
            <form className='innerCreateRecipeContainer' onSubmit={onFormSubmit}>
            <label className='createRecipeLabel'>Recipe Name: </label>
            <input className='createRecipeInput' id="Name" name="Name" type="text" placeholder="Enter name.."/>

            <label className='createRecipeLabel'>Recipe Image Url: </label>
            <input className='createRecipeInput' id="ImageUrl" name="ImageUrl" type="text" placeholder="Enter image url.."/>

            <label className='createRecipeLabel'>Recipe Description: </label>
            <input className='createRecipeInput' id="Description" name="Description" type="text" placeholder="Enter description.."/>

            <label className='createRecipeLabel'>Recipe Instructions: </label>
            <input className='createRecipeInput' id="Instructions" name="Instructions" type="text" placeholder="Enter instructions.."/>

            <button className='createRecipeBtn' type='submit'>Publish</button>
            </form>
        </div>
        </>
    );
}

export default CreateRecipe;