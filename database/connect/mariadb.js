const mariadb = require('mysql'); // mysql 모듈을 불러온다.

const conn = mariadb.createConnection( // mariadb와 연결
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'Tennis'
    }
)

module.exports = conn;