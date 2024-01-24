import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const setDocToDB = async (path, docName, docData) => {
  try {
    const docRtef = doc(db, path, docName);
    await setDoc(docRtef, docData);
  } catch (e) {
    console.log('data sending error', e);
  }
};
export default setDocToDB;


