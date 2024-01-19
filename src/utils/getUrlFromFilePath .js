// import { getDownloadURL, ref } from 'firebase/storage';
// import { db } from '../firebaseConfig';

// const getUrlFromFilePath = (path) => {
//   const fileRef = ref(db, path);
//  getDownloadURL(fileRef).then((url) => {
//     console.log(url);
//     return url;
//   });
// };
// export default getUrlFromFilePath;

import { getDownloadURL, ref } from 'firebase/storage';
import { db } from '../firebaseConfig';

const getUrlFromFilePath = (path) => {
  const fileRef = ref(db, path);

  const url = getDownloadURL(fileRef);
  console.log(url);
  return url;
};

export default getUrlFromFilePath;
