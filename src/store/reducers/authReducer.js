const initState = {
  errorMessage: null,
  successUpdateProfile: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return state;

    case 'LOGOUT_SUCCESS':
      return state;

    case 'SIGNIN_SUCCESS':
      return state;

    case 'SIGNIN_ERROR':
      return {
        ...state,
        errorMessage: action.error,
      };

    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        successUpdateProfile: true,
      };

    case 'ERROR_IMAGE_SIZE_TOO_BIG':
      return {
        ...state,
        errorMessage: action.message,
      };

    case 'ERROR_INVALID_FILETYPE':
      return {
        ...state,
        errorMessage: action.message,
      };

    case 'CLEANUP_UPDATE_MESSAGE':
      return {
        ...state,
        successUpdateProfile: false,
      };

    case 'CLEANUP_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default authReducer;
