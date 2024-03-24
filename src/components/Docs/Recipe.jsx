import { useNavigate, useParams } from 'react-router';
import './Recipe.css';
import React, { useEffect, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectRecipesList } from '../../redux/slices/recipesSlice';
import { Link } from 'react-router-dom';

const Recipe = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const params = useParams();
  const recipes = useSelector(selectRecipesList);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    setRecipe(
      recipes?.filter((elem) => {
        return elem.name === params.slug;
      })[0]
    );
  }, [params.slug, recipes]);

  return (
    <div className="recipe">
      <h3 className="recipe__title">{recipe?.name}</h3>
      <p className="recipe__description">{recipe?.description}</p>
      <img
        className="recipe__image"
        src={recipe?.photoURL}
        alt={recipe?.name}
      />
      <h5>Параметри приготування</h5>
      <table>
        <tbody>
          {recipe?.ingredients?.map((elem, i) => {
            return (
              <tr key={i}>
                <td>{elem?.name}</td>
                <td>{elem?.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h5>Приготування</h5>
      {recipe?.videoURL2 && (
        <iframe
          className="youtube-video"
          src={recipe?.videoURL2}
          title="YouTube video player"
        ></iframe>
      )}
      {recipe?.videoURL && (
        <Link to={recipe?.videoURL2}>{recipe?.videoURL2}</Link>
      )}

      <p className="recipe__description">{recipe?.descriptionOfPreparation}</p>
      <div className="recipe__buttons-block">
        {user?.role?.isAdmin && (
          <button
            onClick={() => {
              navigate(`/docs/recipe-edit/${recipe?.name}`);
            }}
          >
            Редагувати
          </button>
        )}
        <button
          className={user?.role?.isAdmin && 'button-round'}
          onClick={() => {
            navigate('/docs/recipes-list');
          }}
        >
          <FaReply />
        </button>
      </div>
    </div>
  );
};

export default Recipe;
