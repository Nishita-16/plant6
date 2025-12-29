// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // middlewares
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // routes
// app.use('/api/posts', require('./routes/postRoutes'));

// // mongo connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });





//import path from 'path';
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const savedRoutes = require("./routes/savedRoutes");
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// routes
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/saved", require("./routes/savedRoutes"));

// mongo connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
