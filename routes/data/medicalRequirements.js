const express = require("express");
const router = express.Router();
const pool = require("../../db");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Get all medical requirements
router.get("/", async (req, res) => {
  console.log("requirements backend");
  try {
    const result = await pool.query("SELECT * FROM medical_requirements");
    res.json(result.rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
});

// POST route with file upload
router.post("/", upload.single("medicalProof"), async (req, res) => {
  console.log("POST request body:", req.body);
  const { resident_id, diseaseName, amount, prescription_given } = req.body;

  // Get the file path if a file was uploaded
  const medicalProof = req.file ? req.file.path : "";

  try {
    const result = await pool.query(
      "INSERT INTO medical_requirements (resident_name, diseaseName, amount, prescription_given, medicalProof) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [resident_id, diseaseName, amount, prescription_given, medicalProof]
    );
    

    console.log("Inserted row:", result.rows[0]);
    res.status(201).json({
      msg: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a medical requirement
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM medical_requirements WHERE medical_req_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Medical requirement not found" });
    }
    res.json({ message: "Medical requirement deleted" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
