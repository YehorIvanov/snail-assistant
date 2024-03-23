import { useNavigate } from 'react-router';
import './Docs.css';
import Recipe from './Recipe';
import RecipeEdit from './RecipeEdit';
import RecipeList from './RecipeList';
import RecipeRandom from './RecipeRandom';
const Docs = () => {
  const navigate = useNavigate();
  return (
    <div className="docs">
      {/* <h3>Docs</h3>
      <p>Розділ з навчальними матеріалами. </p> */}
      <RecipeRandom />
      {/* <RecipeList /> */}
      {/* <Recipe /> */}
      {/* <RecipeEdit /> */}
      {/* <button>FAQ </button> */}
      {/* <button
        onClick={() => {
          navigate('/docs/recipes-list');
        }}
      >
        Техкарти
      </button> */}
      {/* <button>Навчальні матеріали</button> */}
      {/* <button onClick={() => {}}>Action</button> */}
    </div>
  );
};

export default Docs;
