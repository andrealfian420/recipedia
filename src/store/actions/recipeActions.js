import slugify from '../../helpers/slugify';

export const createRecipe = (recipeData, authorData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // if some data is not provided
    const isSomeDataNotExist = Object.values(recipeData).some(
      (data) => data === null
    );

    if (isSomeDataNotExist) {
      return dispatch({
        type: 'ERROR_SOME_DATA_STILL_EMPTY',
        message: 'Some data is still empty !',
      });
    }

    const firestore = getFirestore();
    const storage = getFirebase().storage();
    const storageRef = storage.ref(
      `images/recipes/${slugify(recipeData.title)}-${new Date().getTime()}`
    );
    const permittedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const isImage = permittedTypes.some(
      (type) => type === recipeData.image.type
    );
    const isPermittedSize = recipeData.image.size <= 2000000; // max image size is <= 2mb

    if (isImage) {
      if (isPermittedSize) {
        // do something if the size is ok
        storageRef.put(recipeData.image).then(() => {
          storageRef.getDownloadURL().then((imageURL) => {
            const recipe = {
              title: recipeData.title,
              slug: `${slugify(recipeData.title)}-${new Date().getTime()}`,
              image: imageURL,
              ingredients: recipeData.ingredients,
              instructions: recipeData.instructions,
              duration: `${recipeData.durationNumber} ${recipeData.durationUnit}`,
              stars: [],
              starsCount: 0,
              createdAt: new Date(),
              authorId: authorData.id,
              authorFullName: `${authorData.firstName} ${authorData.lastName}`,
            };

            return firestore
              .collection('recipes')
              .add(recipe)
              .then(() => {
                dispatch({ type: 'CLEANUP_RECIPE_ERROR_MESSAGE' });
                dispatch({
                  type: 'SUCCESS_CREATE_RECIPE',
                  message: 'The recipe has been created',
                });
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        // error image is too big
        dispatch({ type: 'CLEANUP_RECIPE_SUCCESS_MESSAGE' });
        dispatch({
          type: 'RECIPE_IMAGE_TOO_BIG',
          message: 'The image size must be less or equals to 2MB',
        });
      }
    } else {
      // error the file is not an image
      dispatch({ type: 'CLEANUP_RECIPE_SUCCESS_MESSAGE' });
      dispatch({
        type: 'INVALID_RECIPE_FILETYPE',
        message: 'The selected file is not an image',
      });
    }
  };
};

export const updateRecipe = (recipeId, recipeData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const isNewImageExist = recipeData.image.type ? true : false;

    // user is not updating image
    if (!isNewImageExist) {
      return firestore
        .collection('recipes')
        .doc(recipeId)
        .update({
          ...recipeData,
          slug: `${slugify(recipeData.title)}-${new Date().getTime()}`,
        })
        .then(() => {
          dispatch({ type: 'CLEANUP_RECIPE_ERROR_MESSAGE' });
          dispatch({
            type: 'SUCCESS_UPDATE_RECIPE',
          });
        })
        .catch((err) => {
          dispatch({ type: 'CLEANUP_RECIPE_SUCCESS_MESSAGE' });
          dispatch({
            type: 'ERROR_UPDATE_RECIPE',
            message: err.message,
          });
        });
    }

    const storage = getFirebase().storage();
    const storageRef = storage.ref(
      `images/recipes/${slugify(recipeData.title)}-${new Date().getTime()}`
    );
    const permittedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const isImage = permittedTypes.some(
      (type) => type === recipeData.image.type
    );
    const isPermittedSize = recipeData.image.size <= 2000000; // max image size is <= 2mb

    if (isImage) {
      if (isPermittedSize) {
        // do something if the size is ok
        storageRef.put(recipeData.image).then(() => {
          storageRef.getDownloadURL().then((imageURL) => {
            return firestore
              .collection('recipes')
              .doc(recipeId)
              .update({
                ...recipeData,
                image: imageURL,
                slug: `${slugify(recipeData.title)}-${new Date().getTime()}`,
              })
              .then(() => {
                dispatch({ type: 'CLEANUP_RECIPE_ERROR_MESSAGE' });
                dispatch({
                  type: 'SUCCESS_UPDATE_RECIPE',
                });
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        // error image is too big
        dispatch({ type: 'CLEANUP_RECIPE_SUCCESS_MESSAGE' });
        dispatch({
          type: 'RECIPE_IMAGE_TOO_BIG',
          message: 'The image size must be less or equals to 2MB',
        });
      }
    } else {
      // error the file is not an image
      dispatch({ type: 'CLEANUP_RECIPE_SUCCESS_MESSAGE' });
      dispatch({
        type: 'INVALID_RECIPE_FILETYPE',
        message: 'The selected file is not an image',
      });
    }
  };
};

export const deleteRecipe = (recipeId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('recipes').doc(recipeId).delete();
  };
};

export const giveStarToRecipe = (userId, recipeId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection('recipes')
      .doc(recipeId)
      .update({
        stars: firebase.firestore.FieldValue.arrayUnion(userId),
        starsCount: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        console.log('star +1');
      });
  };
};

export const removeStarFromRecipe = (userId, recipeId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection('recipes')
      .doc(recipeId)
      .update({
        stars: firebase.firestore.FieldValue.arrayRemove(userId),
        starsCount: firebase.firestore.FieldValue.increment(-1),
      })
      .then(() => {
        console.log('star -1');
      });
  };
};
