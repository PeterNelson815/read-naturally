USE STUDENT_RECORDS
CREATE TABLE STUDENT (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FIRST_NAME VARCHAR(255) NOT NULL,
  LAST_NAME VARCHAR(255) NOT NULL,
  USERNAME VARCHAR(255) NOT NULL,
  SCHOOL_NAME VARCHAR(255) NOT NULL,
  IS_LICENSED TINYINT(1) NOT NULL DEFAULT 0
);
