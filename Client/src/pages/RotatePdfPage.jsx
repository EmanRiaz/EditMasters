import React, { useState } from 'react';
import axios from 'axios';

export const RotatePdfPage = () => {
  const [rotateFile, setRotateFile] = useState(null);
  const [rotateAngle, setRotateAngle] = useState('');
  const [rotateError, setRotateError] = useState('');

  const handleRotateFileChange = (event) => {
    setRotateFile(event.target.files[0]);
    setRotateError('');
  };

  const handleRotateAngleChange = (event) => {
    setRotateAngle(event.target.value);
    setRotateError('');
  };

  const handleRotateSubmit = async (event) => {
    event.preventDefault();
    const angle = parseInt(rotateAngle, 10);
    if (!rotateFile) {
      setRotateError('Please select a PDF file.');
      return;
    }
    if (isNaN(angle) || ![0, 90, 180, 270].includes(angle)) {
      setRotateError('Please enter a valid rotation angle (0, 90, 180, 270).');
      return;
    }
    const formData = new FormData();
    formData.append('pdf', rotateFile);
    formData.append('angle', angle);
    try {
      const response = await axios.post('http://localhost:5000/api/pdf/rotate-pdf', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rotated.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error rotating PDF:', err);
      setRotateError('Error rotating PDF');
    }
  };

  return (
    <div className="pdf-page-container">
      <h1>Upload and Rotate PDF</h1>
      <form onSubmit={handleRotateSubmit}>
        <div>
          <label htmlFor="pdf">Select PDF:</label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleRotateFileChange}
          />
        </div>
        <div>
          <label htmlFor="angle">Rotation Angle (0, 90, 180, 270):</label>
          <input
            type="number"
            id="angle"
            placeholder="Rotation Angle"
            value={rotateAngle}
            onChange={handleRotateAngleChange}
          />
        </div>
        <button type="submit">Upload and Rotate</button>
      </form>
      {rotateError && <p className="error-message">{rotateError}</p>}
    </div>
  );
};