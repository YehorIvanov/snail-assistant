import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig';
const deleteFileFromStorage = async (path) => {
  if (path) {
    try {
      console.log(path);
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
    } catch (error) {
      console.log('Error deleting file', error);
    }
  } else {
    console.log('No file to delete');
  }
};
export default deleteFileFromStorage;
