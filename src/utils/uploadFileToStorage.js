import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const uploadFileToStorage = (blob, fileName, folder = 'test') => {
  const uploadFilePath = `${folder}/${fileName}`;
  const uploadFileRef = ref(storage, uploadFilePath);
  const uploadTask = uploadBytesResumable(uploadFileRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('ok');
          resolve(downloadURL); 
        } catch (error) {
          console.log(error);
          reject(error);
        }
      }
    );
  });
};

export default uploadFileToStorage;
