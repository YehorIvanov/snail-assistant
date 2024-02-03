import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
// import { slugify } from 'transliteration';
import setDocToDB from '../../utils/setDocToDB';
import { useNavigate, useParams } from 'react-router';
import { selectUsers } from '../../redux/slices/usersSlice';
import getUniqueAdminValues from '../../utils/getUniqueAdminValues';
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
  console.log(editingUser);
  const handlerOnAdminChange = (selected) => {
    console.log(selected);
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
    }
  };
  const handlerOnAvatarChange = () => {};

  if (!!user && (!!user.role.isAdmin || !!user.role.isSuperAdmin)) {
    return (
      <div>
        <h4>Редагувати користувача</h4>
        <p>{editingUser?.userName}</p>

        <form onSubmit={() => {}} className="user-edit_form">
          <label
            className="photo-picker_label"
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
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="email"
            onChange={() => {}}
            value={editingUser?.email}
            disabled
          />
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="text"
            placeholder="Ім'я"
            onChange={() => {}}
            value={editingUser.userName}
            disabled
          />
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="text"
            placeholder="Ім'я"
            onChange={handlerOnFirstNameChange}
            value={editingUser.firstName}
          />
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="text"
            placeholder="Прізвище"
            onChange={handlerOnLastNameChange}
            value={editingUser.lastName}
          />
          <input
            className="user-edit_input"
            style={{ width: '100%' }}
            type="tel"
            placeholder="Телефон"
            onChange={handlerOnTelChange}
            value={editingUser.tel}
          />
          <label>
            Адміністратор:
            <select
              className="users_filter-select"
              value={editingUser.admin.userName}
              // defaultValue={editingUser.admin.userName}
              onChange={(e) => handlerOnAdminChange(e.target.value)}
            >
              {editingUser.admin ? (
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={editingUser.role.isBarista}
                onChange={handlerOnRoleBaristaChange}
                value={editingUser.role.isBarista}
                // disabled={!user.isAdmin}
              />
              {'   '}
              Бариста
            </label>
            <label>
              {' '}
              <input
                type="checkbox"
                checked={editingUser.role.isAdmin}
                onChange={handlerOnRoleAdminChange}
                // disabled={!user.role.isSuperadmin}
              />
              Адмін
            </label>
            <label>
              {'   '}
              <input
                type="checkbox"
                checked={editingUser.role.isSuperadmin}
                onChange={() => {}}
                disabled
              />
              СуперАдмін
            </label>
          </div>
          <button className="new-user_button" type="submit">
            Зберегти Зміни
          </button>
          <button
            className="new-user_button"
            type="button"
            onClick={() => navigate('/user/users')}
          >
            повернутись без Зміни
          </button>
          <button className="new-user_button" type="submit">
            Видалити
          </button>
        </form>
      </div>
    );
  }

  //   const handlerNewUserCreate = () => {};
  //   const handlerOnEmailChange = () => {};
  //   return (
  //     <form
  //     //   onSubmit={handlerCreateNewOrderDesing}
  //       className="new-user_form"
  //       style={{ display: 'flex', gap: '1rem' }}
  //     >
  //       <input
  //         className="new-user_input"
  //         // style={{ width: '100%' }}
  //         type="email"
  //         placeholder="email нового користувача"
  //         onChange={handlerOnEmailChange}
  //         // value={orderDesingName}
  //       />
  //       <button className="new-user_button" type="submit">
  //         Створити
  //       </button>
  //     </form>
  //   );
};

export default UserEdit;

// const NewOrderDesing = () => {
//   const user = useSelector(selectUser);
//   const navigate = useNavigate();
//   const [orderDesingName, setOrderDesingName] = useState('');
//   const handlerOrderDesingNameChange = (e) => {
//     setOrderDesingName(e.target.value);
//   };
//   const handlerCreateNewOrderDesing = (e) => {
//     e.preventDefault();
//     const newOrderDesing = {
//       name: orderDesingName,
//       slug: slugify(orderDesingName),
//       products: [],
//       creator: { email: user.email, user: user.userName },
//       lastUpdate: new Date().getTime(),
//       published: false,
//     };

//     setDocToDB('ordersDesings', newOrderDesing.slug, newOrderDesing).then(() =>
//       navigate(`/orders/order-desinger/${newOrderDesing.slug}`)
//     );
//   };
// };
