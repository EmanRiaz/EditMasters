import React, { useState } from 'react';
import axios from 'axios';

export const MergePdfPage = () => {
  const [mergeFiles, setMergeFiles] = useState([]);
  const [mergeError, setMergeError] = useState('');

  const handleFileChange = (event) => {
    setMergeFiles(event.target.files);
    setMergeError('');
  };

  const handleMergeSubmit = async (event) => {
    event.preventDefault();
    if (mergeFiles.length === 0) {
      setMergeError('Please select at least one PDF file.');
      return;
    }

    const formData = new FormData();
    for (const file of mergeFiles) {
      formData.append('pdfs', file);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/pdf/merge-pdfs', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setMergeError('Error merging PDFs');
    }
  };

  return (
    <div className="pdf-page-container">
      <h1>Upload and Merge PDFs</h1>
      <form onSubmit={handleMergeSubmit}>
        <div>
          <label htmlFor="pdfs">Select PDFs:</label>
          <input
            type="file"
            id="pdfs"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload and Merge</button>
      </form>
      {mergeError && <p className="error-message">{mergeError}</p>}
      <div className="selected-files">
        <h2>Selected Files:</h2>
        <ul>
          {Array.from(mergeFiles).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};