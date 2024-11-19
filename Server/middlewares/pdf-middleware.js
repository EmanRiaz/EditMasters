// middleware.js

const multer = require('multer');
const fs = require('fs');
const path = require('path'); // Add this line to import the path module


// File Upload Middleware
//const upload = multer({ dest: 'uploads/' });
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Logging Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
};

// Cleanup Middleware for removing files after processing
const cleanupFiles = (req, res, next) => {
  if (req.files) {
    req.files.forEach(file => fs.unlinkSync(file.path));
  } else if (req.file) {
    fs.unlinkSync(req.file.path);
  }
  next();
};

module.exports = {upload,logger,errorHandler,cleanupFiles};
