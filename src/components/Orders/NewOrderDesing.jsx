import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { slugify } from 'transliteration';
import setDocToDB from '../../utils/setDocToDB';

const NewOrderDesing = () => {
  const user = useSelector(selectUser);
  const [orderDesingName, setOrderDesingName] = useState('');
  const handlerOrderDesingNameChange = (e) => {
    setOrderDesingName(e.target.value);
  };
  const handlerCreateNewOrderDesing = (e) => {
    e.preventDefault();
    const newOrderDesing = {
      name: orderDesingName,
      slug: slugify(orderDesingName),
      products: [],
      creator: { email: user.email, user: user.userName },
      lastUpdate: new Date().getTime(),
      published: false,
    };

    setDocToDB('ordersDesings', newOrderDesing.slug, newOrderDesing).then(() =>
      setOrderDesingName('')
    );
    //додати оновлення сторінки після відправки данних
  };

  return (
    <form
      onSubmit={handlerCreateNewOrderDesing}
      className="create-order-desing"
      style={{ display: 'flex', gap: '1rem' }}
    >
      <input
        className="create-order-desing_input"
        style={{ width: '100%' }}
        type="text"
        placeholder="Новий шаблон замовлення"
        onChange={handlerOrderDesingNameChange}
        value={orderDesingName}
      />
      <button type="submit">Створити</button>
    </form>
  );
};

export default NewOrderDesing;
