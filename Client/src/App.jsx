import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
import { Error } from './pages/Error';
import { Logout } from './pages/Logout';
import { Footer } from './components/Footer/Footer';
import { AdminLayout } from './components/layouts/Admin-Layout';
import { AdminUsers } from './pages/Admin-Users';
import Dashboard from './pages/Dashboard';
import { RotatePdfPage } from './pages/RotatePdfPage';
import { SplitPdfPage } from './pages/SplitPdfPage';
import { MergePdfPage } from './pages/MergePdfPage';
import { AdminUpdate } from './pages/Admin-Update';
import UserToken from './pages/UserToken';
import AdminToken from './pages/Admin-Token';
import Privateroute from './components/Privateroute';
import UploadImage from './pages/UploadImage';


const App = () => {
  return (
    
  
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Private Routes */}
        <Route element={<Privateroute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merge-pdfs" element={<MergePdfPage />} />
          <Route path="/split-pdf" element={<SplitPdfPage />} />
          <Route path="/rotate-pdf" element={<RotatePdfPage />} />
          <Route path="/upload-image" element={<UploadImage />} />
        </Route>

        {/* Admin Layout and Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="admintoken" element={<AdminToken />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>

        <Route path="/usertoken" element={<UserToken />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
};

export default App;
