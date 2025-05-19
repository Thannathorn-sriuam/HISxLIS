const express = require("express");
const router  = express.Router();
const db      = require("./db");

// GET All Patients
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM patients`);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Error fetching patients" });
  }
});

// Add New Patient
router.post("/", async (req, res) => {
  try {
    const { patient_name, age, gender, diagnosis } = req.body;
    const [result] = await db.query(
      `INSERT INTO patients
         (patient_name, age, gender, diagnosis)
       VALUES (?,?,?,?)`,
      [patient_name, age, gender, diagnosis]
    );
    res.status(201).json({ message: "Patient added", patient_id: result.insertId });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Error adding patient" });
  }
});

// Update Patient
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_name, age, gender, diagnosis } = req.body;

    // Note: diagnosis then id
    await db.query(
      `UPDATE patients
          SET patient_name = ?,
              age          = ?,
              gender       = ?,
              diagnosis    = ?
        WHERE patient_id   = ?`,
      [patient_name, age, gender, diagnosis, id]
    );

    res.json({ message: "Patient updated" });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Error updating patient" });
  }
});

// Delete Patient
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("DELETE /api/patients/:id – received id =", id);
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.path:", req.path);


    // ตรวจสอบว่ามี id และเป็นตัวเลข
    const pid = Number(id);
    if (!id || isNaN(pid)) {
      return res.status(400).json({ error: "Invalid or missing patient id" });
    }

    // ลบข้อมูล
    await db.query(
      `DELETE FROM patients WHERE patient_id = ?`,
      [pid]
    );

    res.json({ message: "Patient deleted" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Error deleting patient" });
  }
});



module.exports = router;
