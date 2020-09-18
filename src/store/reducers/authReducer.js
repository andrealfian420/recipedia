const initState = {
  errorMessage: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return state;

    default:
      return state;
  }
};

export default authReducer;
