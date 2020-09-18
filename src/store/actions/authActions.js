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
            joinedAt: new Date(),
            profileImageUrl:
              'https://firebasestorage.googleapis.com/v0/b/recipedia-34b77.appspot.com/o/man.png?alt=media&token=bff258f3-9dbe-4a72-803a-c0611390bacf',
          })
          .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
          });
      })
      .catch((err) => dispatch({ type: 'SIGNUP_ERROR', error: err.message }));
  };
};
