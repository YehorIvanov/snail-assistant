import React, { useEffect } from 'react';
import { auth, googleAuthProvider, db } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../redux/slices/userSlice';
import { GiSnail } from 'react-icons/gi';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!!currentUser && !!currentUser.email) {
        console.log('auth state changed');
        const userRef = doc(db, 'users', currentUser.email);
        getDoc(userRef).then((docSnapshot) => {
          dispatch(setUser({ ...docSnapshot.data() }));
        });
      } else {
        dispatch(setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handlerSignInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider).then((credentials) => {
      if (!!credentials.user) {
        try {
          const userRef = doc(db, 'users', credentials.user.email);
          getDoc(userRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              updateDoc(userRef, {
                lastLogin: new Date().getTime(),
                userPhotoURL: credentials.user.photoURL,
              })
                .then(() => {})
                .catch((error) => {
                  console.error('Error updating document: ', error);
                });
            } else {
              setDoc(userRef, {
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
              })
                .then(() => {})
                .catch((error) => {
                  console.error('Error creating document: ', error);
                });
            }
          });
        } catch (e) {
          console.error('Error accessing document: ', e);
        }
      }
    });
  };
  const handlerSignOut = () => {
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
  return (
    <div className="login">
      {!user && (
        <h2 className="login_title">
          <GiSnail size="12rem" />
        </h2>
      )}

      {!user && (
        <button className="login_button" onClick={handlerSignInWithGoogle}>
          Увійти з Google
        </button>
      )}
      {user && (
        <>
          <img
            className="login_avatar"
            src={user.userPhotoURL}
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <h4 className="login_username">{user && user.userName}</h4>
          <button className="login_button" onClick={handlerSignOut}>
            Вийти
          </button>
        </>
      )}
      {/* <button onClick={setUserToStore}>setUserToStore</button> */}
    </div>
  );
};

export default Login;
