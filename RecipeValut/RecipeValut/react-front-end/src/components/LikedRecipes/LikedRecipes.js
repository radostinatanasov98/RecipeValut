import { useEffect, useImperativeHandle, useState } from 'react';
import { getLikedRecipes } from '../../services/recipesService';
import { useUserContext } from '../../contexts/UserContext.js';
import { useNavigate} from 'react-router-dom';
import RecipeCard from '../Recipes/RecipeCard/RecipeCard';
import '../Recipes/Recipes.css'

const LikedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const user = useUserContext();
    const id = user.id;
    const navigate = useNavigate();
    useEffect(() => {
        getLikedRecipes(id).then(result => {setRecipes(result)});
    }, []);

    if (id == '') {
        navigate('/');
    }
    return (
        <div className="recipesDiv">
            <ul>
                   {recipes.map(x => <RecipeCard key={x.id} recipe={x}/>)} 
            </ul>
        </div>
    );
}

export default LikedRecipes;