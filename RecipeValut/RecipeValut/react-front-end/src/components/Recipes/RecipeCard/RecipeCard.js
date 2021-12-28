import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = (obj) => {
    const recipe = obj.recipe;
    const navigate = useNavigate();

    return (
        <>
            <li className="cardLi">
                <h3>{recipe.name}</h3>
                <p><img src={recipe.imageUrl} className='cardImg' /></p>
                <p>Type: {recipe.type}</p>
                <button className="detailsBtn" onClick={() => {navigate(`/Details/${recipe.id}`)}}>Details</button>
            </li>
        </>
    );
}

export default RecipeCard;