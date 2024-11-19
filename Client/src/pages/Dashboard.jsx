
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaFilePdf, FaFileUpload, FaUserShield } from 'react-icons/fa';
import { useAuth } from "./../store/auth"; 
const Dashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      
      <div className="card-section">
        <div className="card">
          <h2 className="dashboard-subheading">Edit PDFs</h2>
          <nav className="dashboard-nav">
            <ul>
              <li>
                <Link to="/merge-pdfs" className="card-link">
                  <FaFilePdf className="icon" /> Merge PDFs
                </Link>
              </li>
              <li>
                <Link to="/split-pdf" className="card-link">
                  <FaFilePdf className="icon" /> Split PDF
                </Link>
              </li>
              <li>
                <Link to="/rotate-pdf" className="card-link">
                  <FaFilePdf className="icon" /> Rotate PDF
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="card">
          <h2 className="dashboard-subheading">Edit Images</h2>
          <nav className="dashboard-nav">
            <ul>
              <li>
                <Link to="/upload-image" className="card-link">
                  <FaFileUpload className="icon" /> Upload Image
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Admin section */}
        {user?.isAdmin && (
          <div className="card">
            <h2 className="dashboard-subheading">Admin Panel</h2>
            <nav className="dashboard-nav">
              <ul>
                <li>
                  <NavLink to="/admin" className="card-link">
                    <FaUserShield className="icon" /> Admin Dashboard
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
