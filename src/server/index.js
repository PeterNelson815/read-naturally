const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const getDatabaseConnection = () => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'very_secure',
    database: 'student_records'
  })

  return connection
}

app.get('/student-list', (req, res) => {
  const connection = getDatabaseConnection()
  connection.connect()

  connection.query('SELECT * FROM STUDENT', (err, rows) => {
    if (err) throw err

    const formattedResult = rows.map(row => ({
      id: row.id,
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
  const connection = getDatabaseConnection()
  connection.connect()

  const data = req.body

  const sql =
    `INSERT INTO STUDENT (FIRST_NAME, LAST_NAME, USERNAME, SCHOOL_NAME, IS_LICENSED)
      VALUES (?, ?, ?, ?, ?);`

  connection.query(sql, [
    data.firstName,
    data.lastName,
    data.username,
    data.schoolName,
    data.isLicensed ? 1 : 0
  ],
    (err) => {
      if (err) throw err

      res.end('Success')
    })

  connection.end()
})

app.post('/remove-students', (req, res) => {
  const connection = getDatabaseConnection()
  connection.connect()

  const data = req.body

  data.forEach(student => {
    console.log(`deleting ${student.lastName}, ${student.firstName}; id:${student.id}`)

    const sql =
      `DELETE FROM STUDENT
      WHERE id=?;`

    connection.query(sql, [student.id], (err) => {
      if (err) throw err
    })
  })

  connection.end()
  res.end('debug')
})

app.put('/update-student', (req, res) => {
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
    `UPDATE STUDENT
     SET FIRST_NAME = ?,
     LAST_NAME = ?,
     USERNAME = ?,
     SCHOOL_NAME = ?,
     IS_LICENSED = ?
     WHERE id=?;`

  connection.query(sql, [
     data.firstName,
     data.lastName,
     data.username,
     data.schoolName,
     data.isLicensed ? 1 : 0,
     data.id
  ],
  (err) => {
    if (err) throw err
  })

  connection.end()
  res.send('success')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
