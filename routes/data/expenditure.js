const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Get all expenditures
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM expenditure');
        res.json(result.rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add an expenditure
router.post('/', async (req, res) => {
    const { purpose, amount, receipt, added_by, admin } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO expenditure (purpose, amount, receipt, added_by, admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [purpose, amount, receipt, added_by, admin]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;