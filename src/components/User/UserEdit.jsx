import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import setDocToDB from '../../utils/setDocToDB';
import { useNavigate, useParams } from 'react-router';
import { selectUsers } from '../../redux/slices/usersSlice';
import getUniqueAdminValues from '../../utils/getUniqueAdminValues';
import './UserEdit.css';
import Compressor from 'compressorjs';
import getNewFileNameByUser from '../../utils/getNewFileNameByUser';
import uploadFileToStorage from '../../utils/uploadFileToStorage';
import deleteFileFromStorage from '../../utils/deleteFileFromStorage';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import { setError } from '../../redux/slices/errorSlice';

const UserEdit = () => {
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(
    users.filter((user) => user.email === params.slug)[0]
  );
  const handlerOnSave = () => {
    if (editingUser.role.isAdmin && !user.role.isSuperadmin) {
      dispatch(
        setError(
          `Для редагування данних адміністратора ${editingUser.userName} перейдіть в режим Superadmin`
        )
      );
      return;
    }
    setDocToDB('users', editingUser.email, editingUser).then(() => {
      navigate('/user/users');
    });
  };

  const handlerOnAdminChange = (selected) => {
    const admin = {
      email: selected,
      userName: users.filter((elem) => elem.email === selected)[0].userName,
    };
    setEditingUser({
      ...editingUser,
      admin,
    });
  };
  const handlerOnTelChange = (e) => {
    setEditingUser({
      ...editingUser,
      tel: e.target.value,
    });
  };
  const handlerOnFirstNameChange = (e) => {
    setEditingUser({
      ...editingUser,
      firstName: e.target.value,
      userName: e.target.value + ' ' + editingUser.lastName,
    });
  };
  const handlerOnLastNameChange = (e) => {
    setEditingUser({
      ...editingUser,
      lastName: e.target.value,
      userName: editingUser.firstName + ' ' + e.target.value,
    });
  };
  const handlerOnRoleBaristaChange = (e) => {
    if (user.role.isAdmin) {
      setEditingUser({
        ...editingUser,
        role: { ...editingUser.role, isBarista: e.target.checked },
      });
    }
  };
  const handlerOnRoleAdminChange = (e) => {
    if (user.role.isSuperadmin) {
      setEditingUser({
        ...editingUser,
        role: { ...editingUser.role, isAdmin: e.target.checked },
      });
      return;
    }
    dispatch(
      setError(
        `Для зміни прав адміністратора ${editingUser.userName} перейдіть в режим Superadmin`
      )
    );
  };
  const handlerOnAvatarChange = (e) => {
    const photo = e.target.files[0];
    if (!photo) {
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 425,
      maxHeight: 425,
      convertTypes: 'image/jpeg, image/png',
      success(result) {
        result.name = getNewFileNameByUser(result.name, editingUser.email);
        uploadFileToStorage(result, result.name, 'usersAvatars').then((url) => {
          if (editingUser) {
            deleteFileFromStorage(editingUser.userPhotoURL).catch((err) =>
              console.log('не вдалося видалити попередне фото', err)
            );
          }
          setEditingUser({
            ...editingUser,
            userPhotoURL: url,
          });
          setDocToDB('users', editingUser.email, {
            ...editingUser,
            userPhotoURL: url,
          }).then(() => {});
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };
  const handlerOnUserDelete = (e) => {
    if (!editingUser) {
      console.log('no user');
      return;
    }
    if (editingUser.role.isAdmin && !user.role.isSuperadmin) {
      dispatch(
        setError(
          `Для видалення адміністратора ${editingUser.userName} перейдіть в режим Superadmin`
        )
      );
      return;
    }
    deleteFileFromStorage(editingUser.userPhotoURL);
    deleteDocFromDB('users', editingUser.email)
      .then(() => {
        navigate('/user/users');
      })
      .catch((err) => console.log(err));
  };

  if (!!user && (!!user.role.isAdmin || !!user.role.isSuperAdmin)) {
    return (
      <div className="user-edit">
        <form onSubmit={() => {}} className="user-edit_form">
          <div className="user-edit_form-header">
            <label
              className="photo-picker_label user-edit_avatar"
              style={
                editingUser?.userPhotoURL
                  ? { backgroundImage: `url(${editingUser.userPhotoURL})` }
                  : null
              }
            >
              ОБРАТИ ФОТО
              <input
                className="photo-picker_input"
                onChange={handlerOnAvatarChange}
                type="file"
                accept="image/jpeg, image/png"
              />
            </label>
            <div className="user-edit_info">
              <h4 className="user-edit_title">{editingUser?.userName}</h4>
              <p>{editingUser?.email}</p>
            </div>
          </div>

          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="text"
            placeholder="Ім'я"
            onChange={handlerOnFirstNameChange}
            value={editingUser?.firstName}
          />
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="text"
            placeholder="Прізвище"
            onChange={handlerOnLastNameChange}
            value={editingUser?.lastName}
          />
          <label>Телефон:</label>
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="tel"
            placeholder="Телефон: xxx xxx xx xx"
            onChange={handlerOnTelChange}
            value={editingUser?.tel}
          />
          <label>
            Адміністратор:
            <select
              className="users_filter-select"
              value={editingUser?.admin.userName}
              onChange={(e) => handlerOnAdminChange(e.target.value)}
            >
              {editingUser?.admin ? (
                <option value={editingUser.admin.email}>
                  {editingUser.admin.userName}
                </option>
              ) : (
                <option value="">Оберіть адміністратора...</option>
              )}
              {getUniqueAdminValues(users).map((elem) => {
                return (
                  <option key={elem.email} value={elem.email}>
                    {elem.userName}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="user-edit_role-box">
            <label>
              <input
                type="checkbox"
                checked={editingUser?.role.isBarista}
                onChange={handlerOnRoleBaristaChange}
              />
              {'  Бариста'}
            </label>
            <label>
              <input
                type="checkbox"
                checked={editingUser?.role.isAdmin}
                onChange={handlerOnRoleAdminChange}
              />
              {'   Адмін'}
            </label>
          </div>
          <button
            className="new-user_button"
            type="button"
            onClick={handlerOnSave}
          >
            Зберегти Зміни
          </button>
          <button
            className="new-user_button"
            type="button"
            onClick={() => navigate('/user/users')}
          >
            повернутись без Зміни
          </button>
          <button
            className="new-user_button"
            type="button"
            onClick={handlerOnUserDelete}
          >
            Видалити користувача
          </button>
        </form>
      </div>
    );
  }
};

export default UserEdit;
