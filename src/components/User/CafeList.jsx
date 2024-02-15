import React, { useEffect, useState } from 'react';
import { FaPenAlt, FaReply, FaTrash } from 'react-icons/fa';
import './CafeList.css';
import UserLabel from './UserLabel';
import setDocToDB from '../../utils/setDocToDB';
import { slugify } from 'transliteration';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import getDocFromDB from '../../utils/getDocFromDB';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import getUniqueAdminValues from '../../utils/getUniqueAdminValues';
import { selectUsers } from '../../redux/slices/usersSlice';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import { useNavigate } from 'react-router';
import { selectCafeList, subscribeToCafe } from '../../redux/slices/cafeSlice';
const CafeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const initialNewCaffe = {
    docName: '',
    name: '',
    admin: {},
    address: '',
    workingTime: '',
    phpto: '',
    coment: '',
  };
  const cafeList = useSelector(selectCafeList);
  const [newCafe, setNewCafe] = useState(initialNewCaffe);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(subscribeToCafe());
  }, [dispatch]);

  const handlerOnCafeAdd = (e) => {
    e.preventDefault();
    setDocToDB('cafe', newCafe.docName, {
      ...newCafe,
      admin: { email: user.email, name: user.userName },
    })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setShowAddForm(!showAddForm);
        setNewCafe(initialNewCaffe);
      });
  };
  return (
    <div className="cafe-list">
      <h3 className="cafe-list_title">Мої Локації</h3>
      <div className="cafe-list_container">
        {cafeList &&
          cafeList.map((cafe) => {
            return (
              <div
                key={cafe.name}
                className="cafe-list_cafe-box"
                style={{
                  backgroundImage: `url(${cafe.photo}), linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))`,
                }}
              >
                <div className="cafe-list_cafe-info ">
                  <h5 className="cafe-list_cafe-title">{cafe?.name}</h5>
                  <p>
                    <b>Адресса:</b> {cafe?.address}
                  </p>
                  <p>
                    <b>Графік роботи:</b> {cafe?.workingTime}
                  </p>
                  <div className="cafe-list_cafe-staff">
                    <b>Адміністратор: </b> <UserLabel {...cafe?.admin} />
                  </div>
                  <div>
                    <b>Ппримітки: </b> {cafe?.coment}
                  </div>
                </div>
                <div className="cafe-list_cafe-controls ">
                  <button
                    className="cafe-list_edit-btn button-round"
                    onClick={() => {
                      navigate(`/user/cafe-edit/${cafe.docName}`);
                    }}
                  >
                    <FaPenAlt />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={showAddForm ? { display: 'none' } : { display: 'flex' }}
        className="cafe-edit_buttons-block "
      >
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
          }}
        >
          Додати локацію
        </button>
        <button
          className="button-round"
          onClick={() => {
            navigate(`/user`);
          }}
        >
          <FaReply />
        </button>
      </div>
      <form
        style={showAddForm ? { display: 'flex' } : { display: 'none' }}
        onSubmit={handlerOnCafeAdd}
        className="cafe-list_add-cafe-form"
      >
        <input
          type="text"
          value={newCafe.name}
          onChange={(e) => {
            setNewCafe({
              ...newCafe,
              name: e.target.value,
              docName: slugify(e.target.value),
            });
          }}
          placeholder="Назва локації"
        />
        <button className="cafe-list_add-btn" type="submit">
          зберегти
        </button>
        <button
          className="button-round"
          onClick={() => {
            navigate(`/user`);
          }}
        >
          <FaReply />
        </button>
      </form>
    </div>
  );
};

export default CafeList;
