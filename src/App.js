import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Layout Components
import DefaultLayout from './components/layout/app_layout/DefaultLayout';
import AuthLayout from './components/layout/app_layout/AuthLayout';

// Routes
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';

// Components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Profile from './components/user/Profile';
import ProfileInfo from './components/user/ProfileInfo';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import RecipeDetail from './components/recipe/RecipeDetail';
import CreateRecipe from './components/recipe/CreateRecipe';

function App() {
  return (
    <Router>
      <div className="app">
        <PublicRoute exact path="/" layout={DefaultLayout} component={Home} />
        <PublicRoute path="/about" layout={DefaultLayout} component={About} />
        <PublicRoute
          path="/recipe/:id"
          layout={DefaultLayout}
          component={RecipeDetail}
        />
        <ProtectedRoute
          path="/createrecipe"
          layout={DefaultLayout}
          component={CreateRecipe}
        />
        <ProtectedRoute
          path="/myprofile"
          layout={DefaultLayout}
          component={Profile}
        />
        <ProtectedRoute
          path="/profileinfo"
          layout={DefaultLayout}
          component={ProfileInfo}
        />
        <PublicRoute
          path="/signin"
          layout={AuthLayout}
          component={SignIn}
          isAuthComponent={true}
        />
        <PublicRoute
          path="/signup"
          layout={AuthLayout}
          component={SignUp}
          isAuthComponent={true}
        />
        <PublicRoute
          path="/resetpassword"
          layout={AuthLayout}
          component={ForgotPassword}
          isAuthComponent={true}
        />
      </div>
    </Router>
  );
}

export default App;
