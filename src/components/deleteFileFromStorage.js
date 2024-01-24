import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig';
const deleteFileFromStorage = async (path) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.log('Error deleting file', error);
  }
};
export default deleteFileFromStorage;
