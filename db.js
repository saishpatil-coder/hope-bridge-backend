require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_kbx8njXcz6CB@ep-lucky-water-a5lukqhb-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false } // Required for Neon
});

// Test connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to Neon database');
  }
});

module.exports = pool;