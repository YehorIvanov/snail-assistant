import { useNavigate, useParams } from 'react-router';
import getDocFromDB from '../../utils/getDocFromDB';
import './Recipe.css';
import React, { useEffect, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';

const Recipe = () => {
  const user = useSelector(selectUser);
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getDocFromDB('recipes', params?.slug).then((data) => setRecipe(data));
  }, []);
  console.log('params', params);
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
              <tr>
                <td>{elem?.name}</td>
                <td>{elem?.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h5>Приготування</h5>
      {recipe?.videoURL && (
        <iframe
          className="youtube-video"
          src={recipe?.videoURL}
          title="YouTube video player"
        ></iframe>
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
