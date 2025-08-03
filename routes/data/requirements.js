const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM requirements');
        res.json(result.rows);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, quantity, added_by } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO requirements (name, quantity ,added_by) VALUES ($1, $2, $3) RETURNING *',
            [name, quantity, added_by]
        );
        res.status(201).json(result.rows[0]); // Return the new donation
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM requirements WHERE requirement_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Requirement not found' });
        }
        res.json({ message: 'Requirement deleted' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;