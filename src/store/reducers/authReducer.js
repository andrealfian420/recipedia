const initState = {
  errorMessage: null,
  passwordErrorMessage: null,
  passwordSuccessMessage: null,
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

    case 'UPDATE_PASSWORD_SUCCESS':
      return {
        ...state,
        passwordSuccessMessage: action.message,
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

    case 'WRONG_OLD_PASSWORD':
      return {
        ...state,
        passwordErrorMessage: action.message,
      };

    case 'WRONG_NEW_PASSWORD':
      return {
        ...state,
        passwordErrorMessage: action.message,
      };

    case 'DEFAULT_PASSWORD_ERROR':
      return {
        ...state,
        passwordErrorMessage: action.message,
      };

    case 'NEW_PASSWORD_NOT_MATCH':
      return {
        ...state,
        passwordErrorMessage: action.message,
      };

    case 'PASSWORD_EMPTY':
      return {
        ...state,
        passwordErrorMessage: action.message,
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

    case 'CLEANUP_PASSWORD_ERROR_MESSAGE':
      return {
        ...state,
        passwordErrorMessage: null,
      };

    case 'CLEANUP_PASSWORD_SUCCESS_MESSAGE':
      return {
        ...state,
        passwordSuccessMessage: null,
      };

    default:
      return state;
  }
};

export default authReducer;
