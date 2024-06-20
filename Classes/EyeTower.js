const db = require('./Database')

class EyeTower {
    constructor() {
        this.db = new db();
    }
    addPerson(person) {
        return this.db.addPerson(person);
    }
    
    addUser(user) {
        return this.db.addUser(user);
    }

    addCamera(camera) {
        return this.db.addCamera(camera);
    }
    
    listAllPersons() {
        return this.db.listAllPersons();
    }
    
    listAllUsers() {
        return this.db.listAllUsers();
    }

    listAllCameras() {
        return this.db.listAllCameras();
    }
    
    login(email, password) {
        return this.db.login(email, password);
    }

    findCamera(name) {
        return this.db.findCamera(name);
    }

    findUser(email) {
        return this.db.findUser(email);
    }

    findPerson(name) {
        return this.db.findPerson(name);
    }
    
    modifyPerson(personId, updates) {
        return this.db.modifyPerson(personId, updates);
    }
    
    modifyUser(userId, updates) {
        return this.db.modifyUser(userId, updates);
    }
    
    removeCamera(cameraId) {
        return this.db.removeCamera(cameraId);
    }
    
    removeUser(userId) {
        return this.db.removeUser(userId);
    }
    
    removePerson(personId) {
        return this.db.removePerson(personId);
    }

    viewAlerts(){
        return this.db.viewAlerts();
    }
}

var eyetower = new  EyeTower();

module.exports = eyetower;