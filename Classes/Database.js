const mysql = require('mysql');

// Connect to MySQL


class Database {
    constructor() {
        this.connect();
    }

    connect() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'EyeTower'
        });
          
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            console.log('Connected to MySQL');
        });
    }

    query(sql, values) {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, values, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    }
}
module.exports = Database;