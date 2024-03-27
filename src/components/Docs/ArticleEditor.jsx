import { useEffect, useState } from 'react';
import './ArticleEditor.css';
import { IoIosAdd } from 'react-icons/io';
import {
  FaInfoCircle,
  FaLongArrowAltDown,
  FaReply,
  FaTrash,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';
import getNewFileNameByUser from '../../utils/getNewFileNameByUser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import uploadFileToStorage from '../../utils/uploadFileToStorage';
import deleteFileFromStorage from '../../utils/deleteFileFromStorage';
import setDocToDB from '../../utils/setDocToDB';

const ArticleEditor = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const initialArticle = {
    docName: '',
    title: '',
    content: [],
    editedBy: {},
    published: false,
  };
  const [article, setArticle] = useState(initialArticle);
  const [articleElem, setArticleElem] = useState('');
  useEffect(() => {}, []);

  const handlerOnAddElement = () => {
    let newElement;
    switch (articleElem) {
      case 'Заголовок S':
        newElement = { type: articleElem, content: '' };
        break;
      case 'Заголовок M':
        newElement = { type: articleElem, content: '' };
        break;
      case 'Заголовок L':
        newElement = { type: articleElem, content: '' };
        break;
      case 'Абзац':
        newElement = { type: articleElem, content: '' };
        break;
      case 'Цитата':
        newElement = { type: articleElem, content: '' };
        break;
      case 'Список':
        newElement = { type: articleElem, content: [''] };
        break;
      case 'Відео':
        newElement = {
          type: articleElem,
          content: { videoURL: '', videoURL1: '' },
        };
        break;
      case 'Фото':
        newElement = { type: articleElem, content: { photoURL: '' } };
        break;

      default:
        break;
    }
    newElement &&
      setArticle({ ...article, content: [...article.content, newElement] });
  };
  const handlerOnDellElem = (elemIndex, listIndex) => {
    const contentArr = [...article.content];
    if (contentArr[elemIndex].type === 'Список') {
      contentArr[elemIndex].content.splice(listIndex, 1);
      if (listIndex === 0) {
        contentArr.splice(elemIndex, 1);
      }
    } else {
      contentArr.splice(elemIndex, 1);
    }
    setArticle({ ...article, content: [...contentArr] });
  };

  const handlerOnFieldChange = (elemIndex, value, listIndex) => {
    const contentArr = [...article.content];
    if (contentArr[elemIndex].type === 'Список') {
      contentArr[elemIndex].content[listIndex] = value;
    } else {
      contentArr[elemIndex] = { ...contentArr[elemIndex], content: value };
    }
    setArticle({ ...article, content: [...contentArr] });
  };

  const handlerOnRecipePhotoChange = (e, i) => {
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
        result.name = getNewFileNameByUser(
          `${article.name}-${new Date().getTime()}`,
          user.email
        );
        uploadFileToStorage(result, result.name, 'articles').then((url) => {
          if (article?.content[i]?.content?.photoURL) {
            deleteFileFromStorage(article.content[i].content.photoURL);
          }

          setArticle({
            ...article,
            editedBy: { email: user.email, name: user.userName },
          });
          handlerOnFieldChange(i, { photoURL: url });
          setDocToDB('articles', article.name, article);
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <div className="article-editor">
      <h4>ArticleEditor</h4>
      <hr />
      {article?.content.map((elem, i) => {
        switch (elem.type) {
          case 'Заголовок S':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                <input
                  type="text"
                  value={elem.content}
                  onChange={(e) => {
                    handlerOnFieldChange(i, e.target.value);
                  }}
                />
              </label>
            );
          case 'Заголовок M':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                <input
                  type="text"
                  value={elem.content}
                  onChange={(e) => {
                    handlerOnFieldChange(i, e.target.value);
                  }}
                />
              </label>
            );
          case 'Заголовок L':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                <input
                  type="text"
                  value={elem.content}
                  onChange={(e) => {
                    handlerOnFieldChange(i, e.target.value);
                  }}
                />
              </label>
            );
          case 'Абзац':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                <textarea
                  value={elem.content}
                  onChange={(e) => {
                    handlerOnFieldChange(i, e.target.value);
                  }}
                  cols="30"
                  rows="10"
                />
              </label>
            );
          case 'Цитата':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                <textarea
                  value={elem.content}
                  onChange={(e) => {
                    handlerOnFieldChange(i, e.target.value);
                  }}
                  cols="30"
                  rows="10"
                />
              </label>
            );
          case 'Список':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  {`${elem.type}  `}{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />
                </span>
                {elem.content.map((listItem, listIndex) => {
                  return (
                    <>
                      <input
                        key={listIndex}
                        type="text"
                        value={listItem}
                        placeholder="елемент списку"
                        onChange={(e) => {
                          handlerOnFieldChange(i, e.target.value, listIndex);
                        }}
                      />
                    </>
                  );
                })}
                <div className="article-editor__buttons-block">
                  <button
                    onClick={(e) => {
                      handlerOnDellElem(
                        i,
                        article.content[i].content.length - 1
                      );
                    }}
                  >
                    <FaTrash size="3rem" />
                  </button>
                  <button
                    onClick={(e) => {
                      handlerOnFieldChange(
                        i,
                        '',
                        article.content[i].content.length
                      );
                    }}
                  >
                    <IoIosAdd size="3rem" />
                  </button>
                </div>
              </label>
            );
          case 'Відео':
            return (
              <label key={i} className="article-editor__label">
                <span>
                  Посилання на віддео з YouTube{' '}
                  <FaTrash
                    onClick={() => {
                      handlerOnDellElem(i);
                    }}
                  />{' '}
                  <FaInfoCircle />
                </span>
                <input
                  type="url"
                  placeholder="Встав сюди посилання на відео"
                  value={elem.content.videoURL || ''}
                  onChange={(e) => {
                    const link = e.target.value;
                    const videoId = link.substring(
                      link.lastIndexOf('/') + 1,
                      link.indexOf('?')
                    );
                    const newLink =
                      'https://www.youtube.com/embed/' +
                      videoId +
                      link.substring(link.indexOf('?'));
                    console.log(newLink);
                    handlerOnFieldChange(i, {
                      videoURL: link,
                      videoURL1: newLink,
                    });
                  }}
                />
                <input
                  type="url"
                  onChange={(e) => {
                    handlerOnFieldChange(i, {
                      videoURL: elem.content.videoURL,
                      videoURL1: e.target.value,
                    });
                  }}
                  placeholder="Тут нічого не чіпай)"
                  value={elem.content.videoURL1 || ''}
                />
              </label>
            );
          case 'Фото':
            return (
              <div key={i}>
                <label className="article-editor__label">
                  <span>
                    {elem.type}{' '}
                    <FaTrash
                      onClick={() => {
                        if (elem.content.photoURL) {
                          deleteFileFromStorage(elem.content.photoURL);
                        }
                        handlerOnDellElem(i);
                      }}
                    />
                  </span>
                </label>
                <label
                  className="photo-picker_label"
                  style={
                    elem.content?.photoURL
                      ? { backgroundImage: `url(${elem.content.photoURL})` }
                      : null
                  }
                >
                  ОБРАТИ ФОТО
                  <input
                    className="photo-picker_input"
                    onChange={(e) => {
                      handlerOnRecipePhotoChange(e, i);
                    }}
                    type="file"
                    accept="image/jpeg, image/png"
                  />
                </label>
              </div>
            );
          default:
            break;
        }
      })}
      <hr />
      <label className="article-editor__label">
        Додати елемент
        <div className="article-editor__buttons-block">
          <select
            onChange={(e) => {
              setArticleElem(e.target.value);
            }}
            value={articleElem}
          >
            <option></option>
            <option> Заголовок S</option>
            <option> Заголовок M</option>
            <option> Заголовок L</option>
            <option> Абзац</option>
            <option> Цитата</option>
            <option> Фото</option>
            <option> Відео</option>
            <option> Список</option>
          </select>
          <button className="button-round" onClick={handlerOnAddElement}>
            <IoIosAdd size="3rem" />
          </button>
        </div>
      </label>
      <hr />
      <div className="article-editor__buttons-block">
        <button
          className="button-round"
          onClick={() => {
            navigate('/docs/articles-list');
          }}
        >
          <FaTrash />
        </button>
        <button
          onClick={() => {
            navigate('/docs/articles-list');
          }}
        >
          Зберегти зміни
        </button>
        <button
          className="button-round"
          onClick={() => {
            navigate('/docs/articles-list');
          }}
        >
          <FaReply />
        </button>
      </div>
      <div>
        <FaLongArrowAltDown />
        {`  Попередній перегляд  `}
        <FaLongArrowAltDown />
      </div>
      <div>
        {article?.content.map((elem, i) => {
          switch (elem.type) {
            case 'Заголовок S':
              return <h6 key={i}>{elem.content}</h6>;
            case 'Заголовок M':
              return <h5 key={i}>{elem.content}</h5>;
            case 'Заголовок L':
              return <h4 key={i}>{elem.content}</h4>;
            case 'Абзац':
              return <p key={i}>{elem.content}</p>;
            case 'Цитата':
              return (
                <>
                  <pre key={i}>
                    <code>{elem.content}</code>
                  </pre>
                </>
              );
            case 'Список':
              return (
                <ul key={i}>
                  {elem.content.map((li, i) => {
                    return <li key={i}>{li}</li>;
                  })}
                </ul>
              );
            case 'Відео':
              return (
                <div key={i}>
                  <iframe
                    className="youtube-video"
                    src={elem.content.videoURL1}
                    title="YouTube video player"
                  ></iframe>
                  <Link to={elem.content.videoURL1}>
                    {elem.content.videoURL1}
                  </Link>
                </div>
              );
            case 'Фото':
              return (
                <img key={i} src={elem.content.photoURL} alt={elem.type} />
              );


            default:
              break;
          }
        })}
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis mollitia
        sequi iusto nam at eaque sapiente exercitationem tempore nostrum, et
        facilis quas enim doloremque, itaque asperiores debitis iste expedita
        eum.
      </p>
    </div>
  );
};

export default ArticleEditor;
