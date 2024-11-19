

const express = require('express');
const router = express.Router();
const {  upload,
  logger,
  errorHandler,
  cleanupFiles } = require('../middlewares/pdf-middleware');

const {
  mergePdfs,
  splitPdf,
  rotatePdf
} = require('../controllers/pdf-controller');

// Merge PDFs
router.post('/merge-pdfs', upload.array('pdfs', 10), mergePdfs);

// Split PDF
router.post('/split-pdf', upload.single('pdf'), (req, res, next) => {
  console.log('File upload middleware triggered');
  console.log('Uploaded file info:', req.file);

  if (!req.file) {
    console.error('No file uploaded!');
    return res.status(400).json({ error: 'No file uploaded' });
  }

    // Add this log to confirm where the file is saved
    console.log('File saved in:', req.file.path);
  splitPdf(req, res, next);
});


// Rotate PDF
router.post('/rotate-pdf', upload.single('pdf'), rotatePdf);

module.exports = router;