
import React, { useRef, useState, useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import jsPDF from 'jspdf'; // Import jsPDF

import axios from 'axios';

import 'fabric-history';

const ImageUpload = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [blurValue, setBlurValue] = useState(0);


  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 500,
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image uploaded successfully:', response.data);

        fabric.Image.fromURL(`http://localhost:5000/uploads/${response.data.image}`, (img) => {
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const scaleFactor = Math.min(canvasWidth / img.width, canvasHeight / img.height);

          img.set({
            left: (canvasWidth - img.width * scaleFactor) / 2,
            top: (canvasHeight - img.height * scaleFactor) / 2,
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            crossOrigin: 'anonymous',

          });
          canvas.clear();
          canvas.add(img);
          setUploadedImage(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        },{ crossOrigin: 'anonymous' });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const addRectangle = () => {
    if (canvas && uploadedImage) {
      const rectangle = new fabric.Rect({
        left: Math.random() * 300,
        top: Math.random() * 300,
        fill: 'red',
        width: 100,
        height: 100,
      });
      canvas.add(rectangle);
      canvas.setActiveObject(rectangle);
      canvas.renderAll();
    }
  };
  const addTriangle = () => {
    if (canvas) {
      const triangle = new fabric.Triangle({
        left: 100, // x position
        top: 100,  // y position
        fill: 'red', // Fill color
        width: 100, // Width of the triangle
        height: 100, // Height of the triangle
        angle: 0, // Rotation angle
      });
      canvas.add(triangle);
      canvas.renderAll();
    }
  };
  const addCircle = () => {
    if (canvas && uploadedImage) {
      const circle = new fabric.Circle({
        left: Math.random() * 300,
        top: Math.random() * 300,
        radius: 50,
        fill: 'blue',
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    }
  };

  const startCropping = () => {
    if (uploadedImage) {
      const croppingRect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        fill: 'rgba(0,0,0,0.3)',
        stroke: 'black',
        strokeWidth: 1,
        selectable: true,
        hasControls: true,
      });
      canvas.add(croppingRect);
      canvas.setActiveObject(croppingRect);
      canvas.renderAll();
    }
  };
  
  const cropImage = () => {
    if (uploadedImage && canvas.getActiveObject()) {
      const activeObject = canvas.getActiveObject();
      if (activeObject.type === 'rect') {
        const { left, top, width, height } = activeObject.getBoundingRect();
        
        // Calculate the cropping dimensions based on the image's scale
        const croppedWidth = width / uploadedImage.scaleX;
        const croppedHeight = height / uploadedImage.scaleY;
        const croppedLeft = (left - uploadedImage.left) / uploadedImage.scaleX;
        const croppedTop = (top - uploadedImage.top) / uploadedImage.scaleY;
  
        // Create a canvas to draw the cropped image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = croppedWidth;
        tempCanvas.height = croppedHeight;
        const tempContext = tempCanvas.getContext('2d');
        
        // Draw the cropped portion of the image onto the temp canvas
        tempContext.drawImage(
          uploadedImage.getElement(),
          croppedLeft,
          croppedTop,
          croppedWidth,
          croppedHeight,
          0,
          0,
          croppedWidth,
          croppedHeight
        );
  
        // Create a new Fabric image from the cropped data
        const croppedImage = new fabric.Image(tempCanvas);
        croppedImage.set({
          left: left,
          top: top,
          scaleX: uploadedImage.scaleX,
          scaleY: uploadedImage.scaleY,
        });
  
        // Clear canvas and add the cropped image
        canvas.clear();
        canvas.add(croppedImage);
        setUploadedImage(croppedImage); // Update uploadedImage state with the cropped version
        canvas.setActiveObject(croppedImage);
        canvas.renderAll();
      }
    }
  };
  
  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const addText = () => {
    if (canvas && uploadedImage && textInput) {
      const text = new fabric.Text(textInput, {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: 'black',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      setTextInput(''); // Clear text input
    }
  };

  // Apply Filters
  const applyGrayscale = () => {
    if (uploadedImage) {
      uploadedImage.filters = [new fabric.Image.filters.Grayscale()];
      uploadedImage.applyFilters();
      canvas.renderAll();
    }
  };
  
  const applyBlur = () => {
    if (uploadedImage) {
      uploadedImage.filters = [new fabric.Image.filters.Blur({ blur: blurValue })];
      uploadedImage.applyFilters();
      canvas.renderAll();
    }
  };

  const handleBlurChange = (e) => {
    setBlurValue(parseFloat(e.target.value));
    applyBlur();
  };
  
  const resetCanvas = () => {
    if (canvas) {
      canvas.clear();
      setUploadedImage(null); // Reset uploaded image
      setTextInput(''); // Clear text input
      setBlurValue(0); // Reset blur value
      canvas.backgroundColor = "#fff"; // Reset background color
      canvas.renderAll();
    }
  };
   // function to convert the edited image to PDF
   const convertToPDF = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });

      const pdf = new jsPDF();
      pdf.addImage(dataURL, 'PNG', 10, 10, 190, 0); // Adjust x, y, width, height as needed
      pdf.save('edited_image.pdf'); // Name of the PDF file
    }
  };
 // Function to upload image to Google Drive
 

  const saveCanvasAsImage = () => {
    if (canvas && uploadedImage) {
      uploadedImage.applyFilters();
      canvas.renderAll();
      
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
  
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited_image.png';
      link.click();
    }
  };
  
  

  return (
    <div>
      <h2>Upload and Edit Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} width={800} height={500} style={{ border: '1px solid #000', marginTop: '10px' }} />

      <div style={{ marginTop: '20px' }}>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addTriangle}>Add Triangle</button>

        <button onClick={startCropping}>Start Cropping</button>
        <button onClick={cropImage}>Crop Image</button>
        <input
          type="text"
          placeholder="Enter text"
          value={textInput}
          onChange={handleTextChange}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={addText}>Add Text</button>
        <button onClick={applyGrayscale} style={{ marginLeft: '10px' }}>Apply Grayscale</button>
        <div style={{ marginTop: '10px' }}>
          <label>Blur: </label>
          <input type="range"
            min="0"
            max="1"
            step="0.01"
            value={blurValue}
            onChange={handleBlurChange}
          />
        </div>
        <button onClick={resetCanvas} style={{ marginLeft: '10px' }}>Reset Canvas</button>

        <button onClick={saveCanvasAsImage} style={{ marginLeft: '10px' }}>Save Image</button>
        <button onClick={convertToPDF} style={{ marginLeft: '10px' }}>Convert to PDF</button>
      </div>
    </div>
  );
};

export default ImageUpload;
