const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Get donations for a specific user
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM payment_donations WHERE user_id = $1',
            [user_id]
        );
        res.json(result.rows); // Return array of donations
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM payment_donations'
        );
        res.json(result.rows); // Return array of donations
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new donation (for the donation form)
router.post('/', async (req, res) => {
    const { user_id, requirement_id, amount, transaction_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO payment_donations (user_id, requirement_id, amount, transaction_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, requirement_id, amount, transaction_id]
        );
        res.status(201).json(result.rows[0]); // Return the new donation
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});
// Delete a donation
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM payment_donations WHERE donation_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ message: 'Donation deleted' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;