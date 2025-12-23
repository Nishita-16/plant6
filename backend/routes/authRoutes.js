// // const express = require("express");
// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");

// // const router = express.Router();

// // /* ================= SIGNUP ================= */
// // router.post("/signup", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "All fields required" });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword
// //     });

// //     await newUser.save();

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       user: {
// //         id: newUser._id,
// //         name: newUser.name,
// //         email: newUser.email
// //       }
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // /* ================= LOGIN ================= */
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     res.json({
// //       message: "Login successful",
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email
// //       }
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Signup
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if(existingUser) return res.status(400).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch(err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if(!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         // JWT Token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

//         res.json({
//             user: { id: user._id, name: user.name, email: user.email },
//             token
//         });
//     } catch(err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// REGISTER
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
