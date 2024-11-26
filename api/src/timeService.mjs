import pool from './mysqlPool.mjs'

const getTimes = () => new Promise(
  (resolve, reject) => {
    pool.getConnection(
      (err, connection) => {
        if (err) {
          reject(err)
        }
        connection.query(
          `SELECT * FROM times
            ORDER BY created_at DESC`,
          (err, results) => {
            if (err) {
              reject(err)
            }
            resolve(results)
          })
        connection.release()
      })
  })

const saveTime = (time) => new Promise(
  (resolve, reject) => {
    pool.getConnection(
      (err, connection) => {
        if (err) {
          reject(err)
        }
        connection.query(
          `INSERT INTO times (time)
            VALUES ('${time}')`,
          (err, result) => {
            if (err) {
              reject(err)
            }
            console.log(`New time ${time} was saved to the DB`)
            resolve(result)
          })
        connection.release()
      })
  })

const deleteTime = (id) => new Promise(
  (resolve, reject) => {
    pool.getConnection(
      (err, connection) => {
        if (err) {
          reject(err)
        }
        connection.query(
          `DELETE FROM times
            WHERE id = ${id}`,
          (err, result) => {
          if (err) {
            reject(err)
          }
          console.log(`Time with id ${id} was deleted from the DB`)
          resolve(result)
        })
        connection.release()
      })
  })

export { getTimes, saveTime, deleteTime }
