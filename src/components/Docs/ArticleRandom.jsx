import { useNavigate } from 'react-router-dom';
import './ArticleRandom.css';

const ArticleRandom = () => {
  const navigate = useNavigate();
  return (
    <div className="article-random">
      <h4 className="article-random__title">ArticleRandom</h4>
      <div
        className="article-random__img"
        style={
          {
            //   backgroundImage: `url(${})`,
          }
        }
      ></div>
      <p
        className="article-random__all-articles"
        onClick={() => {
          navigate('/docs/articles-list');
        }}
      >{`Всі статті  >>>`}</p>
    </div>
  );
};

export default ArticleRandom;
