const { conforms } = require('lodash');
const db = require('./Database')
const FaceRecognition = require('./Model')
const { captureImagesFromAllCameras, deleteAllCapturedImages } = require('./utils');

function extractCameraId(imagePath) {
    // Example logic to extract camera ID from imagePath
    const parts = imagePath.split('\\');
    const fileName = parts[parts.length - 1];
    const cameraId = fileName.split('_')[1][0]; // Assuming format is 'capture_cameraId.jpg'
    return cameraId;
}

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
            const time = Date.now()
            for (let i = 0; i < imagePaths.length; i++) {
                const cameraId = extractCameraId(imagePaths[i]); 
                const cam = await this.db.findCameraById(cameraId);
                if (cam.length === 0) {
                    continue;
                }
                const camSev = cam[0].location_severity;
                const names = await this.fr.findPersons( imagePaths[i])
                for (let j = 0; j < names.length; j++) {
                    const person = await this.db.findPerson(names[j]);
                    if (person.length === 0) {
                        continue;
                    }
                    const personId = person[0].person_id;
                    const personSev = person[0].severity;
                    //console.log(personId,cameraId, time)
                    await this.db.insertPersonLog(personId, parseInt(cameraId), time);
                    if (camSev * personSev > 20){
                        //console.log(time, `High severity alert for Person: ${names[j]}, Camera Location: ${cam[0].location}`, camSev * personSev)
                        await this.db.insertAlert(time, `High severity alert for Person: ${names[j]}, Camera Location: ${cam[0].location}`, camSev * personSev);
                    }
                }
            }
            await deleteAllCapturedImages();
            //console.log('Find Persons Completed');

        } catch (error) {
            console.error("Error in findPersons:", error);
        }
    }

}

var eyetower = new  EyeTower();

module.exports = eyetower;