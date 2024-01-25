import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
// import getDocFromDB from './getDocFromDB';

const setDocToDB = async (path, docName, docData) => {
  try {
    const docRtef = doc(db, path, docName);
    await setDoc(docRtef, docData).then(() => {
      // getDocFromDB(path, docName).then((data) => {
      //   console.log(data);
      // });
    });
  } catch (e) {
    console.log('data sending error', e);
  }
};
export default setDocToDB;
