const mysql = require('mysql');
const { HOST, USERNAME, PASSWORD, PORT, DATABASE } = require('./config').dataBase;

// 连接线程池
let pool = mysql.createPool({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  port: PORT,
  database: DATABASE
});

let allServices = {
  query(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            connection.release();
          })
        }
      })
    })
  }
}

// 用户登录
let userLogin = (account, password) => {
  let _sql = `select * from users where account="${account}" and password="${password}";`
  return allServices.query(_sql);
}
