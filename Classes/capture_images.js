const Webcam = require("node-webcam");
const fs = require("fs");
const path = require("path");
const { delay } = require("lodash");

// Directory to save captured images
const outputDir = path.join(__dirname, "/captured_images");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to capture an image from a specific camera and save it
function captureImageFromCamera(deviceId, index) {
    const opts = {
        width: 1280,
        height: 720,
        quality: 100,
        saveShots: true,
        frames: 60,
        output: 'jpg',
        device: deviceId,
        callbackReturn: "location"
    };

    Webcam.capture(path.join(outputDir, `camera_${index}.jpg`), opts, (err, data) => {
        if (err) {
            console.error(`Error capturing image from camera ${index}:`, err);
        } else {
            resolve(data);
            //console.log(`Image captured from camera ${index} and saved to ${data}`);
        }
    });
    
}

// Function to enumerate devices and capture images from each camera
async function captureImagesFromAllCameras() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    Webcam.list((list) => {
        const promises = list.map((device, index) => {
            return captureImageFromCamera(device, index + 1);
        });
        Promise.all(promises)
                .then((imagePaths) => {
                    resolve(imagePaths); 
                })
                .catch((error) => {
                    reject(`Error capturing images: ${error}`);
                });
    });
}

// Function to delete all captured images
async function deleteAllCapturedImages() {
    fs.readdir(outputDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(outputDir, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                } else {
                    //console.log(`Deleted file: ${filePath}`);
                }
            });
        });

        fs.rmdir(outputDir, (err) => {
            if (err) {
                console.error(`Error deleting directory ${outputDir}:`, err);
            } else {
                //console.log(`Deleted directory: ${outputDir}`);
            }
        });
    });
}

module.exports = {captureImagesFromAllCameras,deleteAllCapturedImages};