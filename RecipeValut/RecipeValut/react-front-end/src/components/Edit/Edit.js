import * as recipesService from '../../services/recipesService.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.js';
import { useState } from 'react/cjs/react.development';

const EditRecipe = () => {
    const navigate = useNavigate();
    const user = useUserContext();
    const id = user.id;
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        if (id == '') {
            navigate('/Login');
        } 
        recipesService.getRecipeById(recipeId).then(result => (setRecipe(result)));
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let Id = recipe.id;
        let Name = formData.get('Name');
        let ImageUrl = formData.get('ImageUrl');
        let Description = formData.get('Description');
        let Instructions = formData.get('Instructions');
        let TypeId = formData.get('Type');

        if (recipesService.validateRecipe(Id, Name, ImageUrl, Description, Instructions, TypeId)) {
            recipesService.updateRecipe(Id, Name, ImageUrl, Description, Instructions, TypeId);

            navigate(`/Details/${Id}`);
        }
    }

    return (
        <>
        <h1 className='createRecipeH1'>Edit Recipe</h1>

        <div className='createRecipeContainer'>
            <form className='innerCreateRecipeContainer' onSubmit={onFormSubmit}>
                <label className='createRecipeLabel'>Recipe Name: </label>
                <input className='createRecipeInput' id="Name" name="Name" type="text" defaultValue={recipe.name}/>

                <label className='createRecipeLabel'>Recipe Image Url: </label>
                <input className='createRecipeInput' id="ImageUrl" name="ImageUrl" type="text" defaultValue={recipe.imageUrl}/>

                <label className='createRecipeLabel'>Recipe Description: </label>
                <input className='createRecipeInput' id="Description" name="Description" type="text" defaultValue={recipe.description}/>

                <label className='createRecipeLabel'>Recipe Instructions: </label>
                <input className='createRecipeInput' id="Instructions" name="Instructions" type="text" defaultValue={recipe.instructions}/>

                <p className='radioInputParagraph' defaultValue={recipe.TypeId}>Type:</p>
                <div className="radioDiv">
                <div className='radioDivOption'>
                    <input className="radioInput" type="radio" name="Type" value="1"/>
                    <p className="radioInputParagraph">Meat</p>
                </div>
                <div className='radioDivOption'>
                    <input className="radioInput" type="radio" name="Type" value="2"/>
                    <p className="radioInputParagraph">Vegan</p>
                </div>
                <div className='radioDivOption'>
                    <input className="radioInput" type="radio" name="Type" value="3"/>
                    <p className="radioInputParagraph">Vegetarian</p>
                </div>
                </div>

                <button className='createRecipeBtn' type='submit'>Publish</button>
            </form>
        </div></>
    );
}

export default EditRecipe;