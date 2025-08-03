const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db'); // Adjust path to db.js

router.post('/', async (req, res) => {
  const { username, password, address, phone_number } = req.body;
  console.log("Body of request");
  console.log(req.body);
  try {
    // Check if username already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    console.log("checking of user : ")
    console.log(userCheck)
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (username, password, address, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id, username',
      [username, hashedPassword, address, phone_number]
    );
    console.log("Final Result");
    console.log(result);

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;