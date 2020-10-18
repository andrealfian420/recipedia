const initState = {
  successCreateRecipeStatus: false,
  errorCreateRecipeMessage: null,
};

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SUCCESS_CREATE_RECIPE':
      return {
        ...state,
        successCreateRecipeStatus: true,
      };

    case 'ERROR_SOME_DATA_STILL_EMPTY':
      return {
        ...state,
        errorCreateRecipeMessage: action.message,
      };
      
    case 'INVALID_RECIPE_FILETYPE':
      return {
        ...state,
        errorCreateRecipeMessage: action.message,
      };

    case 'RECIPE_IMAGE_TOO_BIG':
      return {
        ...state,
        errorCreateRecipeMessage: action.message,
      };

    case 'RESET_RECIPE_SUCCESS_STATUS':
      return {
        ...state,
        successCreateRecipeStatus: false,
      };

    case 'CLEANUP_RECIPE_ERROR_MESSAGE':
      return {
        ...state,
        errorCreateRecipeMessage: null,
      };

    default:
      return state;
  }
};

export default recipeReducer;
