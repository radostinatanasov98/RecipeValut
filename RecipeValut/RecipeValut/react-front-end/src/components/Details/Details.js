import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import * as recipesService from '../../services/recipesService.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.js';

import './Details.css';

const Details = () => {
    const user = useUserContext();
    const id = user.id;
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [relation, setRelation] = useState(false);
    const navigate = useNavigate();

    const likeBtnSymbol = relation == true ? '🧡' : '🖤';

    useEffect(() => {
        recipesService.getRecipeById(recipeId).then(result => setRecipe(result));
        recipesService.getRelation(id, recipeId).then(result => setRelation(result))}, []);

    const likeBtnOnClick = () => {
        let newLikesCount;
        let newRelation;

        if (relation) {
            recipesService.dislikeRecipe(id, recipeId);
            newLikesCount = recipe.likesCount - 1;
            newRelation = false;
        } else {
            recipesService.likeRecipe(id, recipeId);
            newLikesCount = recipe.likesCount + 1;
            newRelation = true;
        }

        setRecipe(oldState => ({...oldState, likesCount: newLikesCount}))
        setRelation(newRelation);
    };

    const deleteBtnHandler = () => {
        recipesService.deleteRecipe(recipeId);
        navigate('/Recipes');
    }

    const ownerBtns = (<div className='ownerBtns'>
        {id == recipe.userId ? <>
                        <button  className='detailsBtn' onClick={() => {navigate(`/Edit/${recipe.id}`)}}>Edit</button>
                        <button  className='detailsBtn deleteBtn' href="#" onClick={deleteBtnHandler}>Delete</button> 
                        </> : null }
    </div>);

    return (
        <div className='detailsDiv'>
            <img src={recipe.imageUrl} className='detailsElement detailsImg'/>
            <div className='detailsInfo'>
            <h1 className='detialsH'>{recipe.name}</h1>
            <h2>Type: {recipe.type}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.instructions}</p>

            {id != '' ? <>
                <button className='detailsBtn' onClick={likeBtnOnClick}>{recipe.likesCount} {likeBtnSymbol}</button>
                    {ownerBtns}
                </> : null}
            </div>
        </div>
    );
}

export default Details;