import { combineReducers } from 'redux';
import authReducer from './authReducer';
import recipeReducer from './recipeReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
