import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const getUrlFromFilePath = async (path) => {
  try {
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (e) {
    console.log(e);
  }
};

export default getUrlFromFilePath;
