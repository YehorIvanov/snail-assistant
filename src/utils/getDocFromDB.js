import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const getDocFromDB = async (path, docName) => {
  try {
    const docRef = doc(db, path, docName);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log('Error getting data', e);
    return null;
  }
};
export default getDocFromDB;
