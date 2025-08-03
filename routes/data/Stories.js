const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Get all stories
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM stories');
        res.json(result.rows); // Return array of stories
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;