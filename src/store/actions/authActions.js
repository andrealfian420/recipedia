import { actionTypes } from 'redux-firestore';

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const { firstName, lastName, email, password } = newUser;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: res.user.email,
            joinedAt: new Date(),
            profileImageUrl:
              'https://firebasestorage.googleapis.com/v0/b/recipedia-34b77.appspot.com/o/default-user.png?alt=media&token=7ca7e426-b72a-4e33-84c8-a273f809207e',
          })
          .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
          });
      })
      .catch((err) => dispatch({ type: 'SIGNUP_ERROR', error: err.message }));
  };
};

export const signIn = (userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { email, password } = userData;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: 'SIGNIN_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNIN_ERROR', error: err.message });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
        dispatch({ type: actionTypes.CLEAR_DATA });
      });
  };
};

export const updatePassword = (userData, newPassword) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      userData.email,
      userData.oldPassword
    );

    // To be completed later on
    user
      .reauthenticateWithCredential(credential)
      .then((res) => {
        // old password ok
        user
          .updatePassword(newPassword)
          .then((res) => console.log('password updated'))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        // old password is wrong
        console.log('Password lama salah');
      });
  };
};

export const updateProfile = (userId, newData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { newProfileImage } = newData;

    // if user doesn't upload new profile pic
    if (!newProfileImage) {
      return firestore
        .collection('users')
        .doc(userId)
        .update({ firstName: newData.firstName, lastName: newData.lastName })
        .then(() => dispatch({ type: 'UPDATE_PROFILE_SUCCESS' }))
        .catch((err) => console.log(err));
    }

    const storage = getFirebase().storage();
    const storageRef = storage.ref(`images/${newProfileImage.fileName}`);

    storageRef.put(newProfileImage.image).then(() => {
      // Get the URL from the uploaded image
      storageRef.getDownloadURL().then((newImageURL) => {
        // update the profile
        firestore
          .collection('users')
          .doc(userId)
          .update({
            firstName: newData.firstName,
            lastName: newData.lastName,
            profileImageUrl: newImageURL,
          })
          .then(() => dispatch({ type: 'UPDATE_PROFILE_SUCCESS' }))
          .catch((err) => console.log(err));
      });
    });
  };
};
