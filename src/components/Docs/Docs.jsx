import { useNavigate } from 'react-router';
import './Docs.css';
import RecipeRandom from './RecipeRandom';
import ArticleRandom from './ArticleRandom';
import { Link } from 'react-router-dom';
const Docs = () => {
  return (
    <div className="docs">
      <RecipeRandom />
      <ArticleRandom />
      <Link to={'/docs/article'}>Article</Link>
      <Link to={'/docs/article-edit'}>ArticleEdit</Link>
    </div>
  );
};

export default Docs;
