import { useNavigate } from 'react-router';
import './RecipeRandom.css';
import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { CiCoffeeCup } from 'react-icons/ci';

const RecipeRandom = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getDocsColectionFromDB('recipes').then((data) => {
      setRecipe(data[Math.floor(Math.random() * data.length)]);
    });
  }, []);
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
          //   className="recipe-list__add"
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
