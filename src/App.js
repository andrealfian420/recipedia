import React from 'react';

// Components
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 shadow-2xl flex-grow">
      <Sidebar />
    </div>
  );
}

export default App;
