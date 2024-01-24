import { auth } from '../firebaseConfig';
import { setUser } from '../redux/slices/userSlice';

const signOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log('signout');
      setUser(null);
    })
    .catch((error) => {
      console.error('Помилка виходу:', error);
    });
};
export default signOut;
