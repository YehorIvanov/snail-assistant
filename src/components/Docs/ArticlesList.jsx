import { FaReply } from 'react-icons/fa';
import './ArticlesList.css';
import { useNavigate } from 'react-router';

const ArticlesList = () => {
  const navigate = useNavigate();
  return (
    <div>
      ArticlesList
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

export default ArticlesList;
