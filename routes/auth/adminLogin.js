const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db');

router.post('/', async (req, res) => {
    const { username, password} = req.body;
    console.log(req.body)
    try {
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isMatch = password == admin.password
        // const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Admin login successful', admin: { admin_id: admin.admin_id, username: admin.username } });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post("/register", async (req, res) => {
  const { username, password, address, phone } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO admins (username , password , address , phone_number) values ($1,$2,$3,$4)",
      [username, password,address,phone]
    );
    res.json({
      message: "Admin login successful",
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;