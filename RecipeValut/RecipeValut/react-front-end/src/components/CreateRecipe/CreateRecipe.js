import './CreateRecipe.css';
import * as recipeService from '../../services/recipesService.js';
import { useUserContext } from '../../contexts/UserContext.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateRecipe = () => {
    const navigate = useNavigate();
    const user = useUserContext();
    const id = user.id;

    useEffect(() => {
        if (id == '') {
            navigate('/Login');
        }
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let Id = id;
        let Name = formData.get('Name');
        let ImageUrl = formData.get('ImageUrl');
        let Description = formData.get('Description');
        let Instructions = formData.get('Instructions');
        let TypeId = formData.get('Type');

        if (recipeService.validateRecipe(Id, Name, ImageUrl, Description, Instructions, TypeId)) {
            recipeService.createRecipe(Id, Name, ImageUrl, Description, Instructions, TypeId);

            navigate('/Recipes');
        }

        return null;
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

                <p className='radioInputParagraph'>Type:</p>
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

export default CreateRecipe;