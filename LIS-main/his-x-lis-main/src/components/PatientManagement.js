import React, { useState } from 'react';
import PatientForm from './PatientForm';

const PatientManagement = ({ username, onLogout, patients, onAddPatient, onDeletePatient, onEditPatient }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => {
    const name = (patient.patient_name || '').toLowerCase();
    const testType = (patient.test_type || '').toLowerCase();
    const search = (searchTerm || '').toLowerCase();

    return name.includes(search) || testType.includes(search);
  });


  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setShowEditForm(true);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="main-title">ระบบสารสนเทศห้องปฏิบัติการ (LIS)</h1>
            <div className="user-info">
              <span className="user-greeting">สวัสดี, {username}</span>
              <button className="btn-danger" onClick={onLogout}>ออกจากระบบ</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">ข้อมูลผู้ป่วย</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  placeholder="ค้นหาชื่อหรือประเภทการตรวจ"
                />
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-success"
                >
                  เพิ่มผู้ป่วยใหม่
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ชื่อ-นามสกุล</th>
                      <th>อายุ</th>
                      <th>เพศ</th>
                      <th>ประเภทการตรวจ</th>
                      <th>ผลการตรวจ</th>
                      <th>วันที่</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((item) => (
                      <tr key={item.patient_id}>
                        <td>{item.patient_id}</td>
                        <td>{item.patient_name}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.test_type}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.test_result === 'ปกติ' ? 'badge-success' : 'badge-danger'
                            }`}
                          >
                            {item.test_result}
                          </span>
                        </td>
                        <td>{new Date(item.test_date).toLocaleDateString('th-TH')}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="btn-primary"
                            >
                              แก้ไข
                            </button>
                            <button
                              onClick={() => onDeletePatient(item.patient_id)}
                              className="btn-danger"
                            >
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Patient Modal */}
      {showAddForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">เพิ่มข้อมูลผู้ป่วยใหม่</h2>
              <button className="modal-close" onClick={() => setShowAddForm(false)}>&times;</button>
            </div>
            <PatientForm
              onClose={() => setShowAddForm(false)}
              onSave={(newPatient) => {
                onAddPatient(newPatient);
                setShowAddForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">แก้ไขข้อมูลผู้ป่วย</h2>
              <button className="modal-close" onClick={() => setShowEditForm(false)}>&times;</button>
            </div>
            <PatientForm
              patient={currentPatient}
              onClose={() => setShowEditForm(false)}
              onSave={(updatedPatient) => {
                onEditPatient(updatedPatient);
                setShowEditForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;