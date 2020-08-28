import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Sidebar from './components/layout/Sidebar';
import Home from './components/pages/Home';
import Footer from './components/layout/Footer';

function App() {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    if (window.pageYOffset > 1) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  return (
    <Router>
      <div className="text-gray-600 font-body font-semibold min-h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-12  flex-grow">
          <Sidebar isScroll={isScroll} />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
