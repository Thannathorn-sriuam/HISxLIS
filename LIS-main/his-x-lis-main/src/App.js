import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import PatientManagement from './components/PatientManagement';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [patients, setPatients] = useState([]);

  // ดึงข้อมูลผู้ป่วยทั้งหมด
  const fetchPatients = () => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Failed to fetch patients', err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  // เพิ่มข้อมูลผู้ป่วย
  const addPatient = (newPatient) => {
    fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPatient)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add patient');
        return res.json();
      })
      .then(() => fetchPatients())
      .catch(err => console.error('Failed to add patient:', err));
  };

  // แก้ไขข้อมูลผู้ป่วย (ใช้ patient_id)
  const editPatient = (updatedPatient) => {
    fetch(`/api/patients/${updatedPatient.patient_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPatient)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to edit patient');
        return res.json();
      })
      .then(() => fetchPatients())
      .catch(err => console.error('Failed to edit patient:', err));
  };

  // ลบข้อมูลผู้ป่วย (ใช้ patient_id)
  const deletePatient = (patient_id) => {
    fetch(`/api/patients/${patient_id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete patient');
        return res.json();
      })
      .then(() => fetchPatients())
      .catch(err => console.error('Failed to delete patient:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <PatientManagement
          username={username}
          onLogout={handleLogout}
          patients={patients}
          onAddPatient={addPatient}
          onDeletePatient={deletePatient}
          onEditPatient={editPatient}
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
