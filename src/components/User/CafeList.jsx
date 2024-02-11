import React, { useEffect, useState } from 'react';
import { FaPenAlt } from 'react-icons/fa';
import './CafeList.css';
import UserLabel from './UserLabel';
import setDocToDB from '../../utils/setDocToDB';
import { slugify } from 'transliteration';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import getDocFromDB from '../../utils/getDocFromDB';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
const CafeList = () => {
  const user = useSelector(selectUser);
  const initialNewCaffe = {
    docName: '',
    name: '',
  };
  const [cafeList, setCafeList] = useState([]);
  const [newCafe, setNewCafe] = useState(initialNewCaffe);
  const [showAddForm, setShowAddForm] = useState(false);
  useEffect(() => {
    getDocsColectionFromDB('cafe').then((data) => {
      setCafeList(data);
    });
  }, [showAddForm]);

  console.log(cafeList);

  const handlerOnCafeAdd = (e) => {
    e.preventDefault();
    setDocToDB('cafe', newCafe.docName, {
      ...newCafe,
      admin: { email: user.email, name: user.userName },
    })
      .then(
        getDocFromDB('cafe', newCafe.docName).then((data) => console.log(data))
      )
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
        <div className="cafe-list_cafe-box">
          <div className="cafe-list_cafe-info ">
            <h5 className="cafe-list_cafe-title">Золоті Ворота</h5>
            <p>
              <b>Адресса:</b> Володимирська 40/2
            </p>
            <p>
              <b>Графік роботи:</b> Пн-Пт 8-20, Сб-Нд вихідний
            </p>
            <div className="cafe-list_cafe-staff">
              <b>На зміні: </b>{' '}
              <UserLabel
                {...{ name: 'Yehor Inanov', email: '2229696@gmail.com' }}
              />
            </div>
            <div>Ппримітки: </div>
          </div>
          <div className="cafe-list_cafe-controls ">
            <button className="cafe-list_add-btn button-round">
              <FaPenAlt />
            </button>
          </div>
        </div>
        <div className="cafe-list_cafe-box">
          <div className="cafe-list_cafe-info ">
            <h5 className="cafe-list_cafe-title">Хрешатик 1</h5>
            <p>
              <b>Адресса:</b> Хрещатик 27
            </p>
            <p>
              <b>Графік роботи:</b> Пн-Пт 8-20, Сб-Нд 8-20
            </p>
            <div className="cafe-list_cafe-staff">
              <b>На зміні: </b>{' '}
              <UserLabel
                {...{ name: 'Yehor Inanov', email: '2229696@gmail.com' }}
              />
            </div>
          </div>
          <div className="cafe-list_cafe-controls ">
            <button className="cafe-list_add-btn button-round">
              <FaPenAlt />
            </button>
          </div>
        </div>
        <div className="cafe-list_cafe-box">
          <div className="cafe-list_cafe-info ">
            <h5 className="cafe-list_cafe-title">Хрешатик 1 Ніч</h5>
            <p>
              <b>Адресса:</b> Хрещатик 27
            </p>
            <p>
              <b>Графік роботи:</b> Пн-Пт 20-8, Сб-Нд 20-8
            </p>
            <div className="cafe-list_cafe-staff">
              <b>На зміні: </b>{' '}
              <UserLabel
                {...{ name: 'Yehor Inanov', email: '2229696@gmail.com' }}
              />
            </div>
          </div>
          <div className="cafe-list_cafe-controls ">
            <button className="cafe-list_add-btn button-round">
              <FaPenAlt />
            </button>
          </div>
        </div>
        <div className="cafe-list_cafe-box">
          <div className="cafe-list_cafe-info ">
            <h5 className="cafe-list_cafe-title">Золоті Ворота</h5>
            <p>
              <b>Адресса:</b> Володимирська 40/2
            </p>
            <p>
              <b>Графік роботи:</b> Пн-Пт 8-20, Сб-Нд вихідний
            </p>
          </div>
          <div className="cafe-list_cafe-controls ">
            <button className="cafe-list_add-btn button-round">
              <FaPenAlt />
            </button>
          </div>
        </div>
        {cafeList &&
          cafeList.map((cafe) => {
            return (
              <div className="cafe-list_cafe-box">
                <div className="cafe-list_cafe-info ">
                  <h5 className="cafe-list_cafe-title">{cafe?.name}</h5>
                  <p>
                    <b>Адресса:</b> {cafe?.addres}
                  </p>
                  <p>
                    <b>Графік роботи:</b> {cafe?.workingTime}
                  </p>
                  <div className="cafe-list_cafe-staff">
                    <b>На зміні: </b>{' '}
                    {/* <UserLabel
                      {...{ name: 'Yehor Inanov', email: '2229696@gmail.com' }}
                    /> */}
                  </div>
                  <div>Ппримітки: </div>
                </div>
                <div className="cafe-list_cafe-controls ">
                  <button className="cafe-list_add-btn button-round">
                    <FaPenAlt />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => {
          setShowAddForm(!showAddForm);
        }}
        hidden={showAddForm}
      >
        Додати локацію
      </button>
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
          {' '}
          зберегти
        </button>
      </form>
    </div>
  );
};

export default CafeList;
