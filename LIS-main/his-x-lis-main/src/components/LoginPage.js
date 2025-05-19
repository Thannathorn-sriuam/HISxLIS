import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (username === 'admin' && password === 'password') {
      onLogin(username);
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">ระบบสารสนเทศห้องปฏิบัติการ (LIS)</h1>
      <p className="login-subtitle">กรุณาเข้าสู่ระบบเพื่อดำเนินการ</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label>ชื่อผู้ใช้</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ใส่ชื่อผู้ใช้"
        />
      </div>
      
      <div className="form-group">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ใส่รหัสผ่าน"
        />
      </div>
      
      <button className="btn-primary" onClick={handleSubmit}>เข้าสู่ระบบ</button>
      
      <p className="login-note">* ชื่อผู้ใช้: admin, รหัสผ่าน: password</p>
    </div>
  );
};

export default LoginPage;