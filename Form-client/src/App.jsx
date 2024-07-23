import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Form from './pages/Form';
import Home from './pages/Home';
import Welcome from './pages/Welcome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Form />} />
        
        <Route path="/welcome" element={<Welcome/>}/>

      </Routes>
    </Router>
  );
}

export default App;