const initState = {
  errorMessage: null,
  newProfileImageURL: null,
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

    case 'SUCCESS_UPLOAD_NEW_IMAGE':
      return {
        ...state,
        newProfileImageURL: action.newImageURL,
      };

    case 'CLEANUP_NEW_IMAGE_URL':
      return {
        ...state,
        newProfileImageURL: null,
      };

    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        successUpdateProfile: true,
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
