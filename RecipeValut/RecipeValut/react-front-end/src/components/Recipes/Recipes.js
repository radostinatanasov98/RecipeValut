import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../services/recipesService';
import RecipeCard from './RecipeCard/RecipeCard';
import './Recipes.css'

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes().then(result => {setRecipes(result)});
    }, []);

    return (
        <div className="recipesDiv">
            <ul>
                   {recipes.map(x => <RecipeCard key={x.id} recipe={x}/>)} 
            </ul>
        </div>
    );
}

export default Recipes;