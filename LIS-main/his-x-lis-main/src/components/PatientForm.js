import React, { useState } from 'react';

const PatientForm = ({ patient, onClose, onSave }) => {
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // YYYY-MM-DD สำหรับ backend
  }

  const [formData, setFormData] = useState(
    patient || {
      patient_id: '',
      patient_name: '',
      age: '',
      gender: 'ชาย',
      test_type: '',
      test_result: 'ปกติ',
      test_date: formatDate(new Date())
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave({
      patient_id: Number(formData.patient_id),
      patient_name: formData.patient_name,
      age: Number(formData.age),
      gender: formData.gender,
      test_type: formData.test_type,
      test_date: formData.test_date,
      test_result: formData.test_result,
    });
  };

  return (
    <>
      <div className="modal-body">

        <div className="form-group">
          <label>ชื่อ-นามสกุล</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            placeholder="กรอกชื่อ-นามสกุล"
          />
        </div>

        <div className="form-group">
          <label>อายุ</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="กรอกอายุ"
          />
        </div>

        <div className="form-group">
          <label>เพศ</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </div>

        <div className="form-group">
          <label>ประเภทการตรวจ</label>
          <input
            type="text"
            name="test_type"
            value={formData.test_type}
            onChange={handleChange}
            placeholder="กรอกประเภทการตรวจ"
          />
        </div>

        <div className="form-group">
          <label>ผลการตรวจ</label>
          <select name="test_result" value={formData.test_result} onChange={handleChange}>
            <option value="ปกติ">ปกติ</option>
            <option value="สูงกว่าปกติ">สูงกว่าปกติ</option>
            <option value="ต่ำกว่าปกติ">ต่ำกว่าปกติ</option>
          </select>
        </div>

        <div className="form-group">
          <label>วันที่</label>
          <input
            type="text"
            name="test_date"
            value={formData.test_date}
            onChange={handleChange}
            readOnly
          />
        </div>
      </div>

      <div className="modal-footer">
        <button onClick={onClose} className="btn-danger">ยกเลิก</button>
        <button onClick={handleSubmit} className="btn-primary">บันทึก</button>
      </div>
    </>
  );
};

export default PatientForm;
