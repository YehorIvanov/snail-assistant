import React, { useState } from 'react';
import { slugify } from 'transliteration';
import Compressor from 'compressorjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import uploadFileToStorage from '../utils/uploadFileToStorage';

const OrderDesigner = () => {
  const [orderDesigner, setOrderDesigner] = useState({
    name: '',
    pseudo: '',
    products: [],
    creator: {},
    lastUpdate: new Date().getTime(),
  });
  const handlerDeletProduct = (index) => {
    const updatedProducts = [...orderDesigner.products];
    updatedProducts.splice(index, 1);
    setOrderDesigner({
      ...orderDesigner,
      products: updatedProducts,
    });
  };

  const handlerSaveChangesToOrder = () => {
    console.log(orderDesigner);
    const docRtef = doc(db, 'ordersDesings', orderDesigner.pseudo);
    setDoc(docRtef, { ...orderDesigner });
    getDoc(docRtef).then((docSnapshot) => {
      console.log(docSnapshot.data());
    });
  };

  const handlerOnPhotoChange = (e, index) => {
    const photo = e.target.files[0];
    if (!photo) {
      console.log('no file');
      return;
    }
    new Compressor(photo, {
      quality: 0.6,
      maxWidth: 320,
      maxHeight: 320,
      convertTypes: 'image/png, image/webp, image/jpeg',
      success(result) {
        const updatedProducts = [...orderDesigner.products];

        uploadFileToStorage(result, result.name, 'products')
          .then((url) => {
            console.log('URL завантаженого файлу:', url);
            updatedProducts[index].productPhoto = url;
            setOrderDesigner({
              ...orderDesigner,
              products: updatedProducts,
            });
          })
          .catch((error) => {
            console.error('Помилка завантаження файлу:', error);
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
      pseudo: slugify(e.target.value),
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
          productPseudo: '',
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
      updatedProducts[index].productPseudo = slugify(value);
    }
    setOrderDesigner({
      ...orderDesigner,
      products: updatedProducts,
    });
  };
  return (
    <div className="order-designer">
      <h5 className="order-designer_title">Конструктор Замовлень</h5>
      <hr />
      <input
        className="order-designer_input"
        type="text"
        placeholder="Назва Замовлення"
        value={orderDesigner.name}
        onChange={handlerOnNameChange}
      />
      <input
        className="order-designer_input"
        type="text"
        placeholder="Псевдо Замовлення"
        value={orderDesigner.pseudo}
        disabled
        hidden
      />
      <hr />
      <div>
        {orderDesigner.products.map((product, index) => {
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
                      handlerOnPhotoChange(e, index);
                    }}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
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
    </div>
  );
};

export default OrderDesigner;
