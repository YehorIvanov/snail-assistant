import { useEffect, useState } from 'react';
import './RecipeEdit.css';
import { FaInfoCircle, FaReply, FaTrash, FaPlus, FaCopy } from 'react-icons/fa';
import getDocFromDB from '../../utils/getDocFromDB';
import setDocToDB from '../../utils/setDocToDB';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import getNewFileNameByUser from '../../utils/getNewFileNameByUser';
import uploadFileToStorage from '../../utils/uploadFileToStorage';
import deleteFileFromStorage from '../../utils/deleteFileFromStorage';
import Compressor from 'compressorjs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router';
const RecipeEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    getDocFromDB('recipes', params.slug).then((data) => setRecipe(data));
    console.log(recipe);
  }, []);

  const handlerOnFieldChange = (e, fieldName) => {
    console.log(e.target.value, recipe[fieldName]);
    setRecipe({ ...recipe, [fieldName]: e.target.value });
  };

  const handlerOnIngredientNameChange = (e, i) => {
    const ingredientsArr = [...recipe.ingredients];
    ingredientsArr[i].name = e.target.value;
    setRecipe({ ...recipe, ingredients: [...ingredientsArr] });
  };

  const handlerOnIngredientQuantityChange = (e, i) => {
    const ingredientsArr = [...recipe.ingredients];
    ingredientsArr[i].quantity = e.target.value;
    setRecipe({ ...recipe, ingredients: [...ingredientsArr] });
  };
  const handlerOnDeleteRecipe = () => {
    deleteDocFromDB('recipes', recipe.name);
  };
  const handlerOnSaveRecipe = () => {
    setDocToDB('recipes', recipe.name, { ...recipe }).then(
      navigate('/docs/recipes-list')
    );
  };

  const handlerOnRecipePhotoChange = (e) => {
    const photo = e.target.files[0];
    if (!photo) {
      console.log('no file');
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 425,
      maxHeight: 425,
      convertTypes: 'image/jpeg, image/png',
      success(result) {
        result.name = getNewFileNameByUser(recipe.name, user.email);
        uploadFileToStorage(result, result.name, 'recipes').then((url) => {
          if (recipe.photoURL) {
            deleteFileFromStorage(recipe.photoURL);
          }
          setRecipe({
            ...recipe,
            photoURL: url,
            editedBy: { email: user.email, name: user.userName },
          });
          setDocToDB('recipes', recipe.name, recipe);
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <div className="recipe-edit">
      <h4>Редагування техкарти</h4>

      <label className="recipe-edit__label ">
        Назва напою
        <input
          onChange={(e) => {
            handlerOnFieldChange(e, 'name');
          }}
          value={recipe?.name}
          type="text"
          placeholder="Назва напою"
        />
      </label>

      <label className="recipe-edit__label">
        Опис напою
        <textarea
          onChange={(e) => {
            handlerOnFieldChange(e, 'description');
          }}
          value={recipe?.description}
          placeholder="Опис напою"
          cols="30"
          rows="50"
        ></textarea>
      </label>
      <label
        className="photo-picker_label"
        style={
          recipe?.photoURL
            ? { backgroundImage: `url(${recipe.photoURL})` }
            : null
        }
      >
        ОБРАТИ ФОТО
        <input
          className="photo-picker_input"
          onChange={handlerOnRecipePhotoChange}
          type="file"
          accept="image/jpeg, image/png"
        />
      </label>

      <label className="recipe-edit__label">
        Опис приготування
        <textarea
          value={recipe?.descriptionOfPreparation}
          onChange={(e) => {
            handlerOnFieldChange(e, 'descriptionOfPreparation');
          }}
          placeholder="Опис приготування"
          cols="30"
          rows="50"
        />
      </label>

      <label className="recipe-edit__label">
        <span>
          Посилання на віддео з YouTube <FaInfoCircle />
        </span>
        <input
          type="url"
          onChange={(e) => {
            handlerOnFieldChange(e, 'videoURL');
          }}
          placeholder="https://www.youtube.com/embed/8mQrudgO2l8"
          value={recipe?.videoURL}
        />
      </label>
      {recipe?.ingredients?.map((elem, i) => {
        return (
          <label key={i} className="recipe-edit__label">
            Інгрідіент {i + 1}
            <input
              type="text"
              placeholder="Назва інгрідіенту"
              value={elem?.name}
              onChange={(e) => {
                handlerOnIngredientNameChange(e, i);
              }}
            />
            <input
              onChange={(e) => {
                handlerOnIngredientQuantityChange(e, i);
              }}
              type="text"
              placeholder="Кількість"
              value={elem?.quantity}
            />
          </label>
        );
      })}
      <button
        onClick={() => {
          setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, { name: '', quantity: '' }],
          });
        }}
      >
        <FaPlus /> Додати інгрідієнт
      </button>
      <div className="recipe-edit__buttons-block">
        <button className="button-round" onClick={handlerOnDeleteRecipe}>
          <FaTrash />
        </button>
        <button onClick={handlerOnSaveRecipe}>Зберегти зміни</button>
        <button
          className="button-round"
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

export default RecipeEdit;