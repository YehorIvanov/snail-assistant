import { useNavigate } from 'react-router';
import './RecipeRandom.css';
import { useEffect, useState } from 'react';
import { CiCoffeeCup } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { selectRecipesList } from '../../redux/slices/recipesSlice';

const RecipeRandom = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const recipes = useSelector(selectRecipesList);
  useEffect(() => {
    setRecipe(recipes[Math.floor(Math.random() * recipes.length)]);
  }, [recipes]);

  return (
    <div className="recipe-random">
      <h4>Пам'ятаєш як готувати {recipe?.name} ?</h4>
      {recipe?.photoURL ? (
        <div
          className="recipe-random__photo"
          style={{
            backgroundImage: `url(${recipe.photoURL})`,
          }}
          onClick={() => {
            navigate(`/docs/recipe/${recipe?.name}`);
          }}
        ></div>
      ) : (
        <div
          className="recipe-random__photo"
          onClick={() => {
            navigate(`/docs/recipe/${recipe?.name}`);
          }}
        >
          <CiCoffeeCup size="15rem" />
        </div>
      )}
      <p
        className="recipe-random__all-recipes"
        onClick={() => {
          navigate('/docs/recipes-list');
        }}
      >{`Всі рецепти  >>>`}</p>
    </div>
  );
};

export default RecipeRandom;
