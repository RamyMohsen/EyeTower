const { conforms } = require('lodash');
const db = require('./Database')
const FaceRecognition = require('./Model')
const { captureImagesFromAllCameras, deleteAllCapturedImages } = require('./capture_images');


class EyeTower {
    constructor() {
        this.db = new db();
        this.fr = new FaceRecognition();
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

    async findPersonByPhoto(imagePath) {
        const name = await this.fr.findPersonByPhoto(imagePath);
        return this.db.findPerson(name);
    }
    
    getPersonLogs(personId) {
        return this.db.getPersonLogs(personId);
    }

    async insertPersonLog(personId, cameraId) {
        return this.db.insertPersonLog(personId, cameraId);
    }

    async findPersons() {
        try {
            const imagePaths = await captureImagesFromAllCameras();
            for (let i = 0; i < imagePaths.length; i++) {
                const cameraId = extractCameraId(imagePaths[i]); 
                const cam = await this.db.findCameraById(cameraId);
                if (cam.length === 0) {
                    continue;
                }
                const camSev = cam[0].location_severity;
                const names = this.fr.findPersons( imagePaths[i]);
                for (let j = 0; j < names.length; j++) {
                    const person = await this.db.findPerson(names[j]);
                    const personId = person[0].person_id;
                    const personSev = person[0].severity;
                    await insertPersonLog(personId, cameraId);
                    if (camSev * personSev > 20){
                        await this.db.insertAlert(Date.now(), `High severity alert for Person: ${personName}, Camera Location: ${cam[0].location}`, camSev * personSev);
                    }
                }
            }
            await deleteAllCapturedImages();
        } catch (error) {
            console.error("Error in findPersons:", error);
        }
    }

}

var eyetower = new  EyeTower();

module.exports = eyetower;