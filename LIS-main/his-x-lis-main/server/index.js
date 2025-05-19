const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(express.json());

// สร้าง connection pool (แนะนำสำหรับ production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12354678ii',
  database: 'his_lis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/patients-details', (req, res) => {
  const sql = `
        SELECT * FROM patients
  `;

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// GET all patients
app.get('/api/patients', (req, res) => {
  pool.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// POST add patient
app.post('/api/patients', (req, res) => {
  const {
    patient_name,
    age,
    gender,
    test_type,
    test_date,
    test_result,
  } = req.body;

//   console.log('Received body:', req.body);

  const sql = 'INSERT INTO patients (patient_name, age, gender, test_type, test_date, test_result) VALUES (?, ?, ?, ?, ?, ?)';

  const values = [patient_name, age, gender, test_type, test_date, test_result];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, message: 'Patient added successfully' });
  });
});


// PUT edit patient
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const {
    patient_name,
    age,
    gender,
    test_type,
    test_date,
    test_result,
  } = req.body;

  console.log('Update patient:', { id, patient_name, age, gender, test_type, test_date, test_result });

  const sql = `
    UPDATE patients 
    SET patient_name = ?, age = ?, gender = ?, test_type = ?, test_date = ?, test_result = ?
    WHERE patient_id = ?
  `;

  pool.query(sql, [patient_name, age, gender, test_type, test_date, test_result, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated successfully' });
  });
});



// DELETE patient
app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM patients WHERE patient_id = ?';

  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});