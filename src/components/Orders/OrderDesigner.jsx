import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router';
import { slugify } from 'transliteration';
import Compressor from 'compressorjs';
import uploadFileToStorage from '../../utils/uploadFileToStorage';
import setDocToDB from '../../utils/setDocToDB';
import getNewFileNameByUser from '../../utils/getNewFileNameByUser';
import deleteFileFromStorage from '../../utils/deleteFileFromStorage';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import getDocFromDB from '../../utils/getDocFromDB';
import './OrderDesinger.css';
const OrderDesigner = () => {
  const user = useSelector(selectUser);
  const params = useParams();
  const navigate = useNavigate();
  const initialOrderDesing = {
    name: '',
    slug: '',
    photo: '',
    comentToBarista: '',
    products: [],
    creator: {},
    lastUpdate: new Date().getTime(),
    published: true,
  };
  const [orderDesigner, setOrderDesigner] = useState(initialOrderDesing);

  useEffect(() => {
    getDocFromDB('ordersDesings', params.slug).then((data) => {
      setOrderDesigner(data);
    });
  }, [params.slug]);

  const handlerDeletOrderDesing = () => {
    deleteFileFromStorage(orderDesigner.photo);
    orderDesigner.products.forEach((product) => {
      deleteFileFromStorage(product.productPhoto);
    });
    deleteDocFromDB('ordersDesings', orderDesigner.slug);
    setDocToDB('trash', `${new Date().getTime()}-${user.email}`, orderDesigner);
    navigate('/orders/desing-list');
  };
  const handlerDeletProduct = (index) => {
    const updatedProducts = [...orderDesigner.products];
    deleteFileFromStorage(updatedProducts[index].productPhoto).then(() => {
      updatedProducts.splice(index, 1);
      setOrderDesigner({
        ...orderDesigner,
        products: updatedProducts,
      });
      setDocToDB('ordersDesings', orderDesigner.slug, orderDesigner);
    });
  };
  const handlerSaveChangesToOrder = () => {
    setOrderDesigner({
      ...orderDesigner,
      creator: { email: user.email, name: user.userName },
    });
    setDocToDB('ordersDesings', orderDesigner.slug, orderDesigner).then(() => {
      navigate('/orders/desing-list');
    });
  };
  const handlerOnOrderPhotoChange = (e) => {
    const photo = e.target.files[0];
    if (!photo) {
      console.log('no file');
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 320,
      maxHeight: 320,
      convertTypes: 'image/jpeg, image/png',
      success(result) {
        result.name = getNewFileNameByUser(result.name, user.email);
        uploadFileToStorage(result, result.name, 'products').then((url) => {
          if (orderDesigner.photo) {
            deleteFileFromStorage(orderDesigner.photo);
          }
          setOrderDesigner({
            ...orderDesigner,
            photo: url,
            creator: { email: user.email, name: user.userName },
          });
          setDocToDB('ordersDesings', orderDesigner.slug, orderDesigner);
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handlerOnProductPhotoChange = (e, index) => {
    const photo = e.target.files[0];
    if (!photo) {
      console.log('no file');
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 320,
      maxHeight: 320,
      convertTypes: 'image/jpeg, image/png',
      success(result) {
        result.name = getNewFileNameByUser(result.name, user.email);
        const updatedProducts = [...orderDesigner.products];

        uploadFileToStorage(result, result.name, 'products').then((url) => {
          if (updatedProducts[index].productPhoto) {
            deleteFileFromStorage(updatedProducts[index].productPhoto);
          }
          updatedProducts[index].productPhoto = url;
          setOrderDesigner({
            ...orderDesigner,
            creator: { email: user.email, name: user.userName },
            products: updatedProducts,
          });
          setDocToDB('ordersDesings', orderDesigner.slug, orderDesigner);
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handlerOnNameChange = (e) => {
    setOrderDesigner({
      ...orderDesigner,
      name: e.target.value,
      slug: slugify(e.target.value),
    });
  };

  const handleOnPublishedChange = () => {
    setOrderDesigner({
      ...orderDesigner,
      published: !orderDesigner.published,
    });
  };
  const handlerAddOneMoreProduct = () => {
    setOrderDesigner({
      ...orderDesigner,
      products: [
        ...orderDesigner.products,
        {
          productPhoto: '',
          productName: '',
          productSlug: '',
          productUnit: '',
          productCategory: '',
        },
      ],
    });
  };

  const handlerOnProductFieldChange = (value, index, field) => {
    const updatedProducts = [...orderDesigner.products];
    updatedProducts[index][field] = value;
    if (field === 'productName') {
      updatedProducts[index].slug = slugify(value);
    }
    setOrderDesigner({
      ...orderDesigner,
      products: updatedProducts,
    });
  };
  return (
    <div className="order-designer">
      <h5 className="order-designer_title">Шаблон {orderDesigner?.name}</h5>
      <hr />
      <div className="order-designer_top-section">
        <label
          className="photo-picker_label"
          style={
            orderDesigner?.photo
              ? { backgroundImage: `url(${orderDesigner.photo})` }
              : null
          }
        >
          ОБРАТИ ФОТО
          <input
            className="photo-picker_input"
            onChange={handlerOnOrderPhotoChange}
            type="file"
            accept="image/jpeg, image/png"
          />
        </label>
        <div className="order-designer_params">
          <input
            className="order-designer_input"
            type="text"
            placeholder="Назва Замовлення"
            value={orderDesigner?.name}
            onChange={handlerOnNameChange}
            disabled
          />
          <label>
            <input
              type="checkbox"
              onChange={handleOnPublishedChange}
              checked={orderDesigner?.published}
              name="Доступно до замовлення"
              id=""
              value={orderDesigner?.published}
            />
            {'   '}
            Доступно до замовлення
          </label>
        </div>
      </div>
      <textarea
        placeholder="Нагадування баристі, наприклад про мінімальну кількість товару для замовлення."
        value={orderDesigner?.comentToBarista}
        onChange={(e) => {
          setOrderDesigner({
            ...orderDesigner,
            comentToBarista: e.target.value,
          });
        }}
        cols="30"
        rows="10"
      ></textarea>
      <hr />
      <div>
        {orderDesigner?.products.map((product, index) => {
          return (
            <div className="order-designer_product" key={index}>
              <div className="photo-picker">
                <label
                  className="photo-picker_label"
                  style={{
                    backgroundImage: `url(${
                      product.productPhoto && product.productPhoto
                    })`,
                  }}
                >
                  ОБРАТИ ФОТО
                  <input
                    className="photo-picker_input"
                    onChange={(e) => {
                      handlerOnProductPhotoChange(e, index);
                    }}
                    type="file"
                    accept="image/jpeg, image/png"
                  />
                </label>
                <button onClick={() => handlerDeletProduct(index)}>
                  Видалити
                </button>
              </div>
              <div>
                <input
                  className="order-designer_input"
                  type="text"
                  placeholder="Назва"
                  value={product.productName}
                  onChange={(e) => {
                    handlerOnProductFieldChange(
                      e.target.value,
                      index,
                      'productName'
                    );
                  }}
                />

                <input
                  className="order-designer_input"
                  type="text"
                  placeholder="Псевдо"
                  defaultValue={product.productPseudo}
                  readOnly
                  hidden
                />
                <input
                  className="order-designer_input"
                  type="text"
                  placeholder="Одиниця виміру"
                  value={product.productUnit}
                  onChange={(e) => {
                    handlerOnProductFieldChange(
                      e.target.value,
                      index,
                      'productUnit'
                    );
                  }}
                />
                <input
                  className="order-designer_input"
                  type="text"
                  placeholder="Категорія"
                  value={product.productCategory}
                  onChange={(e) => {
                    handlerOnProductFieldChange(
                      e.target.value,
                      index,
                      'productCategory'
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="order-design_controll-button"
        onClick={handlerAddOneMoreProduct}
      >
        Додати новий продукт
      </button>
      <button
        className="order-design_controll-button"
        onClick={handlerSaveChangesToOrder}
      >
        Зберегти зміни
      </button>
      <button
        className="order-design_controll-button"
        onClick={handlerDeletOrderDesing}
      >
        Видалити Шаблон
      </button>
    </div>
  );
};

export default OrderDesigner;
