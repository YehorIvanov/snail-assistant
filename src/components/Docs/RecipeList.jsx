import { useDispatch, useSelector } from 'react-redux';
import './RecipeList.css';
import { selectUser } from '../../redux/slices/userSlice';
import setDocToDB from '../../utils/setDocToDB';
import { IoAddCircleOutline } from 'react-icons/io5';
import { CiCoffeeCup } from 'react-icons/ci';
import { useNavigate } from 'react-router';
import { FaReply } from 'react-icons/fa';
import {
  selectRecipesList,
  subscribeToRecipes,
} from '../../redux/slices/recipesSlice';

const RecipeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const recipes = useSelector(selectRecipesList);
  const handlerOnAddNewRecipe = () => {
    const name = prompt('Вкажіть назву нового напою');
    const newRecipe = {
      docName: name,
      name,
      description: '',
      descriptionOfPreparation: '',
      photoURL: '',
      videoURL: '',
      videoURL2: '',
      ingredients: [],
      editedBy: { userName: user.userName, email: user.email },
    };
    setDocToDB('recipes', newRecipe.docName, newRecipe).then(
      dispatch(subscribeToRecipes())
    );
  };
  return (
    <div className="recipe-list ">
      <h3>Кавова Карта</h3>
      <div className="recipe-list__wraper ">
        {recipes?.map((recipe, i) => {
          return (
            <div key={i} className="recipe-list__item">
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
      <button
        onClick={() => {
          navigate('/docs');
        }}
      >
        <FaReply />
      </button>
    </div>
  );
};

export default RecipeList;
