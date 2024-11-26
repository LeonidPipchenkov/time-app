import mysql from 'mysql2'

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    connection.query(CREATE_TIMES_TABLE_SQL, (err) => {
      if (!err) {
        console.log('Times table was created')
      }
    })
    connection.release()
  }
})

export default pool
