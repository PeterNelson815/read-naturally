const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()

app.get('/student-list', (req, res) => {
  console.log('i tried to get the mysql')
  const mysql = require('mysql')
  // port was 3307 i think
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'very_secure',
    database: 'student_records'
  })

  connection.connect()

  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log(`The solution is: ${rows[0].solution}`)
  })

  connection.end()
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
