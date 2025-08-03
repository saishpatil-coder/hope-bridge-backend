require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db')
const multer = require("multer");

// app.use(express.urlencoded({ extended: true })); // For URL-encoded data

app.use(express.json());
app.use(cors());

const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const adminLoginRoute = require('./routes/auth/adminLogin');
const requirementsRoute = require('./routes/data/requirements');
const donationsRoute = require('./routes/data/donations'); // Add this
const storiesRoute = require('./routes/data/stories'); // Add this
const medicalRequirementsRoute = require('./routes/data/medicalRequirements'); // Add this
const expenditureRoute = require('./routes/data/expenditure');
const residentRoute = require('./routes/data/residents')

app.use('/auth/register', registerRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/admin/login', adminLoginRoute);
app.use('/requirements', requirementsRoute);
app.use('/donations', donationsRoute); // Mount the donations route
app.use('/stories', storiesRoute); // Mount the stories route
app.use('/medical-requirements', medicalRequirementsRoute); // Mount the route
app.use('/expenditure', expenditureRoute);
app.use('/data' , residentRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});