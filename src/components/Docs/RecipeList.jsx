import { useSelector } from 'react-redux';
import './RecipeList.css';
import { selectUser } from '../../redux/slices/userSlice';
import setDocToDB from '../../utils/setDocToDB';
import { IoAddCircleOutline } from 'react-icons/io5';
import { CiCoffeeCup } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { useNavigate } from 'react-router';
import { FaReply } from 'react-icons/fa';

const RecipeList = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getDocsColectionFromDB('recipes').then((data) => {
      setRecipes(data);
    });
  }, []);
  console.log(recipes);
  const handlerOnAddNewRecipe = () => {
    const name = prompt('Вкажіть назву нового напою');
    const newRecipe = {
      docName: name,
      name,
      description: '',
      descriptionOfPreparation: '',
      photoURL: '',
      videoURL: '',
      ingredients: [],
      editedBy: { userName: user.userName, email: user.email },
    };
    console.log(newRecipe, user);
    setDocToDB('recipes', newRecipe.docName, newRecipe);
  };
  return (
    <div className="recipe-list ">
      <h3>Кавова Карта</h3>
      <div className="recipe-list__wraper ">
        {recipes?.map((recipe, i) => {
          return (
            <div className="recipe-list__item">
              {recipe?.photoURL ? (
                <div
                  className="recipe-list__item-photo"
                  style={{
                    backgroundImage: `url(${recipe.photoURL})`,
                  }}
                  onClick={() => {
                    navigate(`/docs/recipe/${recipe?.name}`);
                  }}
                ></div>
              ) : (
                <div
                  className="recipe-list__add"
                  onClick={() => {
                    navigate(`/docs/recipe/${recipe?.name}`);
                  }}
                >
                  <CiCoffeeCup size="6rem" />
                </div>
              )}

              <h6
                onClick={() => {
                  navigate(`/docs/recipe/${recipe?.name}`);
                }}
              >
                {` ${recipe?.name}    `}
              </h6>
            </div>
          );
        })}
        <div className="recipe-list__item">
          <div onClick={handlerOnAddNewRecipe} className="recipe-list__add">
            <IoAddCircleOutline size="6rem" />
          </div>
          <h6 className=".recipe-list__recipe-name">Нова Техкарта</h6>
        </div>
      </div>
      {/* <button onClick={handlerOnAddNewRecipe}>Нова Техкарта</button> */}
      <button
        //   className={user?.role?.isAdmin && 'button-round'}
        onClick={() => {
          navigate('/docs/recipes-list');
        }}
      >
        <FaReply />
      </button>
    </div>
  );
};

export default RecipeList;
