import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const updateDocInDB = async (path, docName, docData) => {
  try {
    const docRtef = doc(db, path, docName);
    await updateDoc(docRtef, docData);
  } catch (e) {
    console.log('data sending error', e);
  }
};
export default updateDocInDB;
