import { useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { selectCafeList } from '../../redux/slices/cafeSlice';

const Docs = () => {
  // const user = useSelector(selectUser);
  // const cafe = useSelector(selectCafeList);
  return (
    <div>
      <h3>Docs</h3>
      <p>Розділ з навчальними матеріалами. </p>
      <button>FAQ (дурні запитання швидкі відповіді)</button>
      <button>Технологічні карти</button>
      <button>Навчальні матеріали</button>
      {/* <button onClick={() => {}}>Action</button> */}
    </div>
  );
};

export default Docs;
