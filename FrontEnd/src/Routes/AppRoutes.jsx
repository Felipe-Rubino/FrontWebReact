import React from 'react'
import Login from '../Pages/Login';
import { AuthContext, AuthProvider } from '../Context/auth';
import Home from '../Pages/Home';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import { useContext } from 'react';
import Cadastro from '../Pages/Cadastro';
import Skill from '../Pages/Skill';

function Private({ children }){
    const { authenticated, loading } = useContext(AuthContext)

    if(loading){
        return <div>Carregando...</div>
    }

    if (!authenticated) {
        return <Navigate to="/" />;
      }
    
    return children;
}
function AppRoutes() {
    return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="*" element={<h1>Error 404 - Page Not Found!</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/skills" element={<Skill />} />
            <Route path="/home" element={<Private><Home /></Private>} /> 
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
  
  export default AppRoutes;