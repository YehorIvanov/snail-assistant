import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { selectCafeList } from '../../redux/slices/cafeSlice';
import { selectUsers } from '../../redux/slices/usersSlice';
import getUniqueAdminValues from '../../utils/getUniqueAdminValues';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import { FaReply, FaTrash } from 'react-icons/fa';
import './CafeEdit.css';
import setDocToDB from '../../utils/setDocToDB';
import Compressor from 'compressorjs';
import getNewFileNameByUser from '../../utils/getNewFileNameByUser';
import { selectUser } from '../../redux/slices/userSlice';
import uploadFileToStorage from '../../utils/uploadFileToStorage';
import deleteFileFromStorage from '../../utils/deleteFileFromStorage';

const CafeEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const cafeList = useSelector(selectCafeList);
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const [editingCafe, setEditingCafe] = useState({});
  useEffect(() => {
    setEditingCafe({
      ...cafeList.filter((cafe) => cafe.docName === params.slug)[0],
    });
  }, [cafeList, params.slug]);
  if (!params.slug) navigate('/user/cafe-list');

  const handlerOnCafePhotoChange = (e) => {
    const photo = e.target.files[0];
    if (!photo) {
      console.log('no file');
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 768,
      maxHeight: 768,
      convertTypes: 'image/jpeg, image/png',
      success(result) {
        result.name = getNewFileNameByUser(result.name, user.email);
        uploadFileToStorage(result, result.name, 'cafe').then((url) => {
          if (editingCafe.photo) {
            deleteFileFromStorage(editingCafe.photo);
          }
          setEditingCafe({
            ...editingCafe,
            photo: url,
          });
          setDocToDB('cafe', editingCafe.docName, {
            ...editingCafe,
            photo: url,
          });
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };
  console.log(editingCafe);
  return (
    <div key={editingCafe?.name} className="cafe-edit_cafe-box">
      <div className='cafe-edit_cafe-header'>
        <label
          className="photo-picker_label"
          style={
            editingCafe?.photo
              ? { backgroundImage: `url(${editingCafe.photo})` }
              : null
          }
        >
          ОБРАТИ ФОТО
          <input
            className="photo-picker_input"
            onChange={handlerOnCafePhotoChange}
            type="file"
            accept="image/jpeg, image/png"
          />
        </label>
        <h4 className="cafe-edit_cafe-title">{editingCafe?.name}</h4>
      </div>
      <label>
        Адресса
        <input
          type="text"
          value={editingCafe?.address}
          placeholder="додайте адрессу"
          onChange={(e) =>
            setEditingCafe({
              ...editingCafe,
              address: e.target.value,
            })
          }
        />
      </label>
      <label>
        Графік роботи
        <input
          type="text"
          placeholder="додайте графік роботи"
          value={editingCafe?.workingTime}
          onChange={(e) =>
            setEditingCafe({
              ...editingCafe,
              workingTime: e.target.value,
            })
          }
        />
      </label>
      <label>
        Адміністратор:
        <select
          value={editingCafe?.workingTime}
          onChange={(e) =>
            setEditingCafe({
              ...editingCafe,
              admin: {
                email: users.filter(
                  (user) => user.userName === e.target.value
                )[0].email,
                userName: e.target.value,
              },
            })
          }
        >
          {getUniqueAdminValues(users).map((admin) => {
            return <option>{admin.userName}</option>;
          })}
        </select>
      </label>
      <label>
        Коментар
        <input
          type="text"
          placeholder="... додайте коментар тут"
          value={editingCafe?.coment}
          onChange={(e) =>
            setEditingCafe({
              ...editingCafe,
              coment: e.target.value,
            })
          }
        />
      </label>
      <div className="cafe-edit_buttons-block">
        <button
          className="button-round"
          onClick={() => {
            if (
              window.confirm(
                'Локація буде видалена. Ви впевнені що хочете видалити локацію?'
              )
            ) {
              deleteDocFromDB('cafe', editingCafe.docName).then(() => {
                deleteFileFromStorage(editingCafe.photo).finally(
                  navigate('/user/cafe-list')
                );
              });
            }
          }}
        >
          <FaTrash />
        </button>
        <button
          onClick={() => {
            setDocToDB('cafe', editingCafe.docName, { ...editingCafe }).then(
              () => {
                navigate('/user/cafe-list');
              }
            );
          }}
        >
          Зберегти зміни
        </button>
        <button
          className="button-round"
          onClick={() => {
            navigate('/user/cafe-list');
          }}
        >
          <FaReply />
        </button>
      </div>
    </div>
  );
};

export default CafeEdit;
