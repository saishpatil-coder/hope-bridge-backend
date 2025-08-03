const express = require("express");
const router = express.Router();
const pool = require("../../db");

// Get list of residents
router.get("/residents", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT resident_id, name, age, joining_date, leaving_date FROM residents"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
