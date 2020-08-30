import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Layout Components
import DefaultLayout from './components/layout/app_layout/DefaultLayout';
import AuthLayout from './components/layout/app_layout/AuthLayout';

// Components
import Home from './components/pages/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword'
import RecipeDetail from './components/recipe/RecipeDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <DefaultLayout exact path="/" component={Home} />
        <DefaultLayout path="/recipe/:id" component={RecipeDetail} />
        <AuthLayout path="/signin" component={SignIn} />
        <AuthLayout path="/signup" component={SignUp} />
        <AuthLayout path="/resetpassword" component={ForgotPassword} />
      </div>
    </Router>
  );
}

export default App;
