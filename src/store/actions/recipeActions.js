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
