const mysql = require('mysql');

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'EyeTower'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

class db {
    // Add a person
    static addPerson(person, callback) {
    const query = 'INSERT INTO Person (name, gender, age, photo_url, severity) VALUES (?, ?, ?, ?, ?)';
    const values = [person.name, person.gender, person.age, person.photoUrl, person.severity];
    connection.query(query, values, (error, results) => {
        if (error) {
        console.error('Error adding person:', error);
        callback(error);
        return;
        }
        callback(null, results.insertId);
    });
    }

    // Add a user
    static addUser(user, callback) {
    const query = 'INSERT INTO account (email, password, type, name) VALUES (?, ?, ?, ?)';
    const values = [user.email, user.password, user.type, user.name];
    connection.query(query, values, (error, results) => {
        if (error) {
        console.error('Error adding user:', error);
        callback(error);
        return;
        }
        callback(null, results.insertId);
    });
    }

    // Find a person by ID
    static findPersonById(personId, callback) {
    const query = 'SELECT * FROM Person WHERE person_id = ?';
    connection.query(query, [personId], (error, results) => {
        if (error) {
        console.error('Error finding person:', error);
        callback(error);
        return;
        }
        callback(null, results[0]);
    });
    }

    // List all persons
    static listAllPersons(callback) {
    const query = 'SELECT * FROM Person';
    connection.query(query, (error, results) => {
        if (error) {
        console.error('Error listing persons:', error);
        callback(error);
        return;
        }
        callback(null, results);
    });
    }

    // List all users
    static listAllUsers(callback) {
    const query = 'SELECT * FROM account WHERE type = "user"';
    connection.query(query, (error, results) => {
        if (error) {
        console.error('Error listing users:', error);
        callback(error);
        return;
        }
        callback(null, results);
    });
    }

    // Login
    static login(email, password, callback) {
    const query = 'SELECT * FROM account WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
        console.error('Error logging in:', error);
        callback(error);
        return;
        }
        callback(null, results[0]);
    });
    }

    // Modify a person
    static modifyPerson(personId, updates, callback) {
    const query = 'UPDATE Person SET ? WHERE person_id = ?';
    connection.query(query, [updates, personId], (error, results) => {
        if (error) {
        console.error('Error modifying person:', error);
        callback(error);
        return;
        }
        callback(null, results.affectedRows);
    });
    }

    // Modify a user
    static modifyUser(userId, updates, callback) {
    const query = 'UPDATE account SET ? WHERE account_id = ?';
    connection.query(query, [updates, userId], (error, results) => {
        if (error) {
        console.error('Error modifying user:', error);
        callback(error);
        return;
        }
        callback(null, results.affectedRows);
    });
    }

    // Add a camera
    static addCamera(camera, callback) {
        const query = 'INSERT INTO Cameras (location, location_severity) VALUES (?, ?)';
        const values = [camera.location, camera.severity];
        connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding camera:', error);
            callback(error);
            return;
        }
        callback(null, results.insertId);
        });
    }
    
    // Remove a camera
    static removeCamera(cameraId, callback) {
        const query = 'DELETE FROM Cameras WHERE cam_id = ?';
        connection.query(query, [cameraId], (error, results) => {
        if (error) {
            console.error('Error removing camera:', error);
            callback(error);
            return;
        }
        callback(null, results.affectedRows > 0);
        });
    }
    
    // Remove a user
    static removeUser(userId, callback) {
        const query = 'DELETE FROM account WHERE account_id = ?';
        connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error removing user:', error);
            callback(error);
            return;
        }
        callback(null, results.affectedRows > 0);
        });
    }
    
    // Remove a person
    static removePerson(personId, callback) {
        const query = 'DELETE FROM Person WHERE person_id = ?';
        connection.query(query, [personId], (error, results) => {
        if (error) {
            console.error('Error removing person:', error);
            callback(error);
            return;
        }
        callback(null, results.affectedRows > 0);
        });
    }
    
    // View all alerts
    static viewAllAlerts(callback) {
        const query = 'SELECT * FROM Alert';
        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error viewing alerts:', error);
            callback(error);
            return;
        }
        callback(null, results);
        });
    }
}
module.exports = db;