const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db'); // Adjust path to db.js

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    // Find user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      console.log("user")
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("2nd")
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    console.log("done")

    // Return user data (excluding password)
    res.json({ message: 'Login successful', user: { user_id: user.user_id, username: user.username } });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;