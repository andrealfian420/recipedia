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

export const updatePassword = (userData, passwordData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const { email, oldPassword } = userData;
    const { newPassword, confirmPassword } = passwordData;

    // if some data is not provided by the user
    if (!oldPassword || !newPassword || !confirmPassword) {
      // do something
      return dispatch({
        type: 'PASSWORD_EMPTY',
        message: `Please fill the password fields`,
      });
    }

    // if the new password doesn't match the confirm password
    if (newPassword !== confirmPassword) {
      // do something
      return dispatch({
        type: 'NEW_PASSWORD_NOT_MATCH',
        message: `The new/confirm password doesn't match`,
      });
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      oldPassword
    );

    // proceed to update the password
    user
      .reauthenticateWithCredential(credential)
      .then((res) => {
        // old password ok
        user
          .updatePassword(newPassword)
          .then(() => {
            dispatch({ type: 'CLEANUP_PASSWORD_ERROR_MESSAGE' });
            dispatch({
              type: 'UPDATE_PASSWORD_SUCCESS',
              message: 'Your password has been updated',
            });
          })
          .catch((err) => {
            dispatch({ type: 'CLEANUP_PASSWORD_SUCCESS_MESSAGE' });
            return dispatch({
              type: 'WRONG_NEW_PASSWORD',
              message: err.message,
            });
          });
      })
      .catch((err) => {
        // if the old password is wrong
        dispatch({ type: 'CLEANUP_PASSWORD_SUCCESS_MESSAGE' });

        switch (err.code) {
          case 'auth/wrong-password':
            return dispatch({
              type: 'WRONG_OLD_PASSWORD',
              message: 'The old password is invalid',
            });

          default:
            return dispatch({
              type: 'DEFAULT_PASSWORD_ERROR',
              message: err.message,
            });
        }
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
    const permittedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const isImage = permittedTypes.some(
      (type) => type === newProfileImage.image.type
    );
    const isPermittedSize = newProfileImage.image.size <= 2000000; // max image size is <= 2mb

    if (isImage) {
      if (isPermittedSize) {
        // Upload the image
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
              .then(() => {
                dispatch({ type: 'CLEANUP_ERROR_MESSAGE' });
                dispatch({ type: 'UPDATE_PROFILE_SUCCESS' });
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        // image size is too big
        dispatch({ type: 'CLEANUP_UPDATE_MESSAGE' });
        dispatch({
          type: 'ERROR_IMAGE_SIZE_TOO_BIG',
          message: 'The maximum size of the image is 2MB',
        });
      }
    } else {
      // the file is not a permitted image type
      dispatch({ type: 'CLEANUP_UPDATE_MESSAGE' });
      dispatch({
        type: 'ERROR_INVALID_FILETYPE',
        message: 'The selected file is not an image',
      });
    }
  };
};
