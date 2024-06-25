const { exec } = require('child_process');
const path = require('path');

class FaceRecognition {
    constructor() {

    }
    findPersonByPhoto(imagePath) {
        return new Promise((resolve, reject) => {
            const pythonScriptPath = path.join(__dirname, 'findPersonByPhoto.py');

            // Execute the Python script
            exec(`python ${pythonScriptPath} ${imagePath}`, (error, stdout, stderr) => {
                // Get the person name from the output
                const lines = stdout.split(/\r?\n/);
                const personName = lines[lines.length - 2].trim()
                resolve(personName);
            });
        });

        
    }
    
    findPersons(imagePath) {
        return new Promise((resolve, reject) => {
            const pythonScriptPath = path.join(__dirname, 'findPersons.py');
            // Execute the Python script
            exec(`python ${pythonScriptPath} ${imagePath}`, (error, stdout, stderr) => {
                
                // Get the person name from the output
                const lines = stdout.split(/\r?\n/);
                const names = lines[lines.length - 2].trim().split(',')

                resolve(names);
            });
        });
    }
}

module.exports = FaceRecognition;
