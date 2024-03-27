import { FaReply } from 'react-icons/fa';
import './Article.css';
import { useNavigate } from 'react-router';

const Article = () => {
  const navigate = useNavigate();
  return (
    <div>
      Article
      <button
        onClick={() => {
          navigate('/docs/articles-list');
        }}
      >
        <FaReply />
      </button>
    </div>
  );
};

export default Article;
