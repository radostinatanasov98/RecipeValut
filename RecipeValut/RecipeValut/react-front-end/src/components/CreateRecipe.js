import './CreateRecipe.css';

function CreateRecipe() {
    return (
        <>
        <h1 className='createRecipeH1'>Create Recipe</h1>

        <div className='createRecipeContainer'>
            <form className='innerCreateRecipeContainer'>
            <label className='createRecipeLabel'>Recipe Name: </label>
            <input className='createRecipeInput' type="text" placeholder="Enter name.."/>
            <label className='createRecipeLabel'>Recipe Image Url: </label>
            <input className='createRecipeInput' type="text" placeholder="Enter image url.."/>
            <label className='createRecipeLabel'>Recipe Description: </label>
            <input className='createRecipeInput' type="text" placeholder="Enter description.."/>
            <label className='createRecipeLabel'>Recipe Instructions: </label>
            <input className='createRecipeInput' type="text" placeholder="Enter instructions.."/>
            <button className='createRecipeBtn'>Publish</button>
            </form>
        </div>
        </>
    );
}

export default CreateRecipe;