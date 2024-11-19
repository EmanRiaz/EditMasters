// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron"); // for scheduling tasks
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const adminRoute = require("./router/admin-router");
const pdfRoute = require("./router/pdf-router");
const { sendEveryMinuteNotification } = require("./controllers/firebase-controller"); // notification controller
const Image = require('./models/image-model'); // Import the image model
const router = express.Router(); // Initialize router
app.use('/api/images', router);
const multer = require('multer');
const path = require('path'); // Require path module
const firebaseRoute = require("./router/firebase-router");// Firebase Route handling
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


// Tackle CORS
const corsOptions = {
  origin: "http://localhost:5173", 
   //origin: '*' ,// Allow from any origin (you can restrict this to specific origins if needed)

  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Mount routers for different routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);  
app.use("/api/pdf", pdfRoute);
app.use("/api/admin", adminRoute);
app.use("/api/firebase", firebaseRoute);

app.use('/uploads', express.static('uploads'));


// Schedule a task to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Sending every minute");
  await sendEveryMinuteNotification();
});

// Image processing setup with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
  }
});

// Create an upload instance and set the storage engine
const upload = multer({ storage: storage });

// Use the upload middleware in your route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await Image.create({ image: req.file.filename });
    res.json({ image: req.file.filename });
  } catch (err) {
    console.error('Error saving image to database:', err);
    res.status(500).json({ error: 'Failed to save image to database' });
  }
});

app.get('/getImage', (req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(500).json(err));
});

// Use error middleware
app.use(errorMiddleware);




// Server setup
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
