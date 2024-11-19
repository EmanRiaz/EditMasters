

const { PDFDocument, degrees } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const mergePdfs = async (req, res, next) => {
  try {
    const pdfDocs = [];

    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDocs.push(pdfDoc);
    }

    const mergedPdf = await PDFDocument.create();

    for (const pdfDoc of pdfDocs) {
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = path.join(__dirname, '../merged.pdf');
    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath, 'merged.pdf', () => {
      req.files.forEach(file => fs.unlinkSync(file.path));
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    next(err);
  }
};
/*Previous one 
const splitPdf = async (req, res, next) => {
  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const numPages = pdfDoc.getPageCount();

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const newPdfBytes = await newPdf.save();
      const outputFileName = `page_${i + 1}.pdf`;
      const outputPath = path.join(__dirname, `../${outputFileName}`);

      fs.writeFileSync(outputPath, newPdfBytes);

      res.download(outputPath, outputFileName, () => {
        fs.unlinkSync(outputPath);
      });
    }
    fs.unlinkSync(req.file.path);
  } catch (err) {
    next(err);
  }
};
*/


const splitPdf = async (req, res, next) => {
  try {
    console.log('File received:', req.file.path);

    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    console.log('PDF loaded with', pdfDoc.getPageCount(), 'pages');

    const numPages = pdfDoc.getPageCount();
    const outputPaths = [];

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const newPdfBytes = await newPdf.save();
      const outputFileName = `page_${i + 1}.pdf`;
      const outputPath = path.resolve(__dirname, `../${outputFileName}`);

      console.log(`Saving page ${i + 1} to ${outputPath}`);
      fs.writeFileSync(outputPath, newPdfBytes);
      outputPaths.push(outputPath);  // Store the file paths to delete later

      // Send file to client
      res.download(outputPath, outputFileName, () => {
        console.log(`File ${outputFileName} sent successfully`);

        // Schedule file deletion after 5 seconds
        setTimeout(() => {
          fs.unlinkSync(outputPath);
          console.log(`Deleted: ${outputPath}`);
        }, 5000);
      });
    }

    // Clean up the uploaded file after all files have been processed
    setTimeout(() => {
      fs.unlinkSync(req.file.path);
      console.log(`Deleted uploaded file: ${req.file.path}`);
    }, 10000); // Delay cleanup to ensure all downloads are complete

  } catch (err) {
    console.error('Error in splitPdf controller:', err);
    next(err);
  }
};

//rotate pdfs
const rotatePdf = async (req, res, next) => {
  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const angle = parseInt(req.body.angle, 10);

    if (isNaN(angle) || ![0, 90, 180, 270].includes(angle)) {
      throw new Error('Invalid rotation angle');
    }

    const pages = pdfDoc.getPages();
    pages.forEach(page => {
      page.setRotation(degrees(angle));
    });

    const rotatedPdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, '../rotated.pdf');
    fs.writeFileSync(outputPath, rotatedPdfBytes);

    res.download(outputPath, 'rotated.pdf', () => {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  mergePdfs,
  splitPdf,
  rotatePdf
};
