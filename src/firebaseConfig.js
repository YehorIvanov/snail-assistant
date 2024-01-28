import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBJjE_MCV6G4MyhKu6JIRp4kkqIBpWoUtw',
  authDomain: 'snail-assistant-dev.firebaseapp.com',
  projectId: 'snail-assistant-dev',
  storageBucket: 'snail-assistant-dev.appspot.com',
  messagingSenderId: '909010116605',
  appId: '1:909010116605:web:fd9450c1cbf26c28014394',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export const storage = getStorage(app);
