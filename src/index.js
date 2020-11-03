import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Loading from './components/loading/Loading';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

// Firebase
import firebase from 'firebase/app';
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
  actionTypes,
} from 'redux-firestore';
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded,
} from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import rootReducer from './store/reducers/rootReducer';

// Redux store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig)
  )
);

// Firebase config
const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: true,
};

const rrfProps = {
  firebase,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
  attachAuthIsReady: true,
  onAuthStateChanged: (authData, firebase, dispatch) => {
    if (!authData) {
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: {
          data: [],
          ordered: ['recipes'],
        },
      });
    }
  },
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);

  if (!isLoaded(auth)) {
    return <Loading loading={!isLoaded(auth)} component="root" />;
  }

  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
