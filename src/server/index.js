const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/student-list', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'very_secure',
    database: 'student_records'
  })

  connection.connect()

  connection.query('SELECT * FROM STUDENT', (err, rows) => {
    if (err) throw err

    const formattedResult = rows.map(row => ({
      firstName: row.FIRST_NAME,
      lastName: row.LAST_NAME,
      username: row.USERNAME,
      schoolName: row.SCHOOL_NAME,
      isLicensed: row.IS_LICENSED === 1 ? true : false,
    }))

    res.json(formattedResult)
  })

  connection.end()
})

app.post('/add-student', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'very_secure',
    database: 'student_records'
  })

  connection.connect()

  const data = req.body

  const sql =
    `INSERT INTO STUDENT (FIRST_NAME, LAST_NAME, USERNAME, SCHOOL_NAME, IS_LICENSED)
      VALUES ('${data.firstName}', '${data.lastName}', '${data.username}', '${data.schoolName}', '${data.isLicensed ? 1 : 0}');`

  connection.query(sql, (err, rows) => {
    if (err) throw err

    res.end('Success')
  })

  connection.end()
})

app.post('/remove-students', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'very_secure',
    database: 'student_records'
  })

  connection.connect()

  const data = req.body

  data.forEach(student => {
    console.log(`deleting ${student.lastName}, ${student.firstName}`)

    const sql =
      `DELETE FROM STUDENT
      WHERE FIRST_NAME='${student.firstName}'
      AND LAST_NAME='${student.lastName}'
      AND USERNAME='${student.username}'
      AND SCHOOL_NAME='${student.schoolName}';`

    connection.query(sql, (err) => {
      if (err) throw err
    })
  })

  connection.end()
  res.end('debug')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
