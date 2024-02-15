import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';

const Docs = () => {
  getDocsColectionFromDB('orders', undefined, undefined, [
    'creator.email',
    '==',
    '2229696@gmail.com',
  ]).then((data) => {
    console.log(data);
  });
  return (
    <div>
      <h3>Docs</h3>
      <p>Розділ з навчальними матеріалами. </p>
      <button>FAQ (дурні запитання швидкі відповіді)</button>
      <button>Технологічні карти</button>
      <button>Навчальні матеріали</button>
    </div>
  );
};

export default Docs;
