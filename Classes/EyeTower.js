const db = require('./Database')

class EyeTower {
    constructor() {
        this.db = new db();
        this.cameras = [];
    }
    addPerson(person) {
        const query = 'INSERT INTO Person (name, gender, age, photo_url, severity) VALUES (?, ?, ?, ?, ?)';
        const values = [person.name, person.gender, person.age, person.photoUrl, person.severity];
        return this.db.query(query, values);
    }
    
    addUser(user) {
        const query = 'INSERT INTO account (email, password, type, name) VALUES (?, ?, ?, ?)';
        const values = [user.email, user.password, user.type, user.name];
        return this.db.query(query, values);
    }

    addCamera(camera) {
        const query = 'INSERT INTO Cameras (location, location_severity) VALUES (?, ?)';
        const values = [camera.location, camera.severity];
        return this.db.query(query, values);
    }
    
    listAllPersons() {
        const query = 'SELECT * FROM Person ORDER BY severity DESC';
        return this.db.query(query);
    }
    
    listAllUsers() {
        const query = 'SELECT * FROM account ORDER BY type DESC';
        return this.db.query(query);
    }

    listAllCameras() {
        const query = 'SELECT * FROM Cameras ORDER BY location_severity ASC';
        return this.db.query(query);
    }
    
    login(email, password) {
        const query = 'SELECT * FROM account WHERE email = ? AND password = ?';
        return this.db.query(query, [email, password]);
    }

    findUser(email) {
        const query = 'SELECT * FROM account WHERE email = ?';
        return this.db.query(query, [email]);
    }

    findPerson(name) {
        const query = 'SELECT * FROM person WHERE name = ?';
        return this.db.query(query, [name]);
    }
    
    modifyPerson(personId, updates) {
        const query = 'UPDATE Person SET ? WHERE person_id = ?';
        return this.db.query(query, [updates, personId]);
    }
    
    modifyUser(userId, updates) {
        const query = 'UPDATE account SET ? WHERE account_id = ?';
        return this.db.query(query, [updates, userId]);
    }
    
    removeCamera(cameraId) {
        const query = 'DELETE FROM Cameras WHERE cam_id = ?';
        return this.db.query(query, [cameraId]);
    }
    
    removeUser(userId) {
        const query = 'DELETE FROM account WHERE account_id = ?';
        return this.db.query(query, [userId]);
    }
    
    removePerson(personId) {
        const query = 'DELETE FROM Person WHERE person_id = ?';
        return this.db.query(query, [personId]);
    }

    viewAlerts(){
        const query = 'SELECT FROM Alert ORDER BY timestamp DESC'
        return this.db.query(query);
    }
}

var eyetower = new  EyeTower();

module.exports = eyetower;