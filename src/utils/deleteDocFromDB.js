import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const deleteDocFromDB = async (path, docName) => {
  try {
    const docRtef = doc(db, path, docName);
    await deleteDoc(docRtef);
  } catch (e) {
    console.log('data deleting error', e);
  }
};

export default deleteDocFromDB