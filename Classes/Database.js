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
    
    addPerson(person) {
      const query = 'INSERT INTO Person (name, gender, age, photo_url, severity) VALUES (?, ?, ?, ?, ?)';
      const values = [person.name, person.gender, person.age, person.photoUrl, person.severity];
      return this.query(query, values);
    }

    addUser(user) {
      const query = 'INSERT INTO Account (email, password, type, name) VALUES (?, ?, ?, ?)';
      const values = [user.email, user.password, user.type, user.name];
      return this.query(query, values);
    }

    addCamera(camera) {
        const query = 'INSERT INTO Cameras (name, location, location_severity) VALUES (?, ?, ?)';
        const values = [camera.name, camera.location, camera.severity];
        return this.query(query, values);
    }
    
    listAllPersons() {
        const query = 'SELECT * FROM Person ORDER BY severity DESC';
        return this.query(query);
    }
    
    listAllUsers() {
        const query = 'SELECT * FROM Account ORDER BY type DESC';
        return this.query(query);
    }

    listAllCameras() {
        const query = 'SELECT * FROM Cameras ORDER BY location_severity ASC';
        return this.query(query);
    }
    
    login(email, password) {
        const query = 'SELECT * FROM Account WHERE email = ? AND password = ?';
        return this.query(query, [email, password]);
    }

    findCamera(name) {
        const query = 'SELECT * FROM Cameras WHERE name = ?';
        return this.query(query, [name]);
    }

    findCameraById(camId) {
        const query = 'SELECT * FROM Cameras WHERE cam_id = ?';
        return this.query(query, [camId]);
    }

    findUser(email) {
        const query = 'SELECT * FROM Account WHERE email = ?';
        return this.query(query, [email]);
    }

    findPerson(name) {
        const query = 'SELECT * FROM person WHERE name = ?';
        return this.query(query, [name]);
    }
    
    modifyPerson(personId, updates) {
        const query = 'UPDATE Person SET ? WHERE person_id = ?';
        return this.query(query, [updates, personId]);
    }
    
    modifyUser(userId, updates) {
        const query = 'UPDATE Account SET ? WHERE account_id = ?';
        return this.query(query, [updates, userId]);
    }
    
    removeCamera(cameraId) {
        const query = 'DELETE FROM Cameras WHERE cam_id = ?';
        return this.query(query, [cameraId]);
    }
    
    removeUser(userId) {
        const query = 'DELETE FROM Account WHERE account_id = ?';
        return this.query(query, [userId]);
    }
    
    removePerson(personId) {
        const query = 'DELETE FROM Person WHERE person_id = ?';
        return this.query(query, [personId]);
    }

    viewAlerts(){
        const query = 'SELECT * FROM Alert ORDER BY timestamp DESC'
        return this.query(query);
    }
    
    getPersonLogs(personId) {
        const query = `
            SELECT p.log_id, c.name AS camera_name, p.time, c.location
            FROM PersonLog p JOIN Cameras c ON p.cam_id = c.cam_id  
            WHERE p.person_id = ? ORDER BY p.time DESC
        `;
        const results = this.query(query, [personId]);
        return results;
    }

    insertPersonLog(personId, cameraId, time) {
        const query = 'INSERT INTO PersonLog (person_id, cam_id, time) VALUES (?, ?, ?)';
        const results = this.query(query, [personId, cameraId, time]);
        return results;
    }

    insertAlert(time, description, severity){
        const query = 'INSERT INTO Alert (timestamp, description,  severity) VALUES (?, ?, ?)';
        const results = this.query(query, [time, description, severity]);
        return results;
    }
}
module.exports = Database;