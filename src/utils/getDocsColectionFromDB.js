import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const getDocsColectionFromDB = async (path) => {
  try {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching order design list:', error);
  }
};
export default getDocsColectionFromDB;
