Drop database if exists his_lis;

CREATE DATABASE if not exists his_lis ;

use his_lis;

create table if not exists patients(
	patient_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patient_name varchar(255),
    age int,
    gender varchar(255),
    test_type varchar(255),
    test_date text,
    test_result varchar(255),
    diagnosis varchar(255)
);

INSERT INTO patients (patient_name, age, gender, test_type, test_date, test_result, diagnosis) VALUES
('สมชาย ประเสริฐ', 45, 'ชาย', 'น้ำตาลในเลือด', '2025-05-16', 'สูงกว่าปกติ', 'ภาวะก่อนเบาหวาน'),
('สุดา ไชยยศ', 32, 'หญิง', 'คอเลสเตอรอล', '2025-05-17', 'ปกติ', 'ระดับไขมันปกติ'),
('อนันต์ วิชัย', 55, 'ชาย', 'ฮีโมโกลบิน', '2025-05-18', 'ต่ำกว่าปกติ', 'ภาวะโลหิตจาง');