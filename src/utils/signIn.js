import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebaseConfig';

import getDocFromDB from './getDocFromDB';
import setDocToDB from './setDocToDB';
import updateDocInDB from './updateDocInDB';

const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleAuthProvider).then((credentials) => {
    if (!!credentials.user) {
      try {
        getDocFromDB('users', credentials.user.email).then((userData) => {
          if (userData) {
            updateDocInDB('users', credentials.user.email, {
              lastLogin: new Date().getTime(),
            });
          } else {
            setDocToDB('users', credentials.user.email, {
              userName: credentials.user.displayName,
              lastLogin: new Date().getDate(),
              userPhotoURL: credentials.user.photoURL,
              email: credentials.user.email,
              firstName: '',
              lastName: '',
              role: {
                isGuest: true,
                isЕrainee: false,
                isBarista: false,
                isAdmin: false,
                isSuperadmin: false,
              },
            });
          }
        });
      } catch (e) {
        console.error('Error accessing document: ', e);
      }
    }
  });
};
export default signInWithGoogle;
