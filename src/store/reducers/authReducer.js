const initState = {
  errorMessage: null,
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
