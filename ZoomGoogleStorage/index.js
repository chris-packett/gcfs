const fetch = require('node-fetch');
const { snakeCase } = require('snake-case');
const { Storage } = require('@google-cloud/storage');

const storageClient = new Storage();

const bucketName = 'mr-automation-zoom-recordings';

const zoomRecordingsBucket = storageClient.bucket(bucketName);

async function uploadFile (fileName, downloadUrl, accessToken) {
    const file = zoomRecordingsBucket.file(fileName);
    const writeStream = file.createWriteStream();

    const res = await fetch(`${downloadUrl}?access_token=${accessToken}`);

    res.body.pipe(writeStream);
}


exports.uploadZoomRecordingToGoogleStorage = (req, res) => {
    const { fileName, fileExt, downloadUrl, accessToken } = req.body;

    const formattedFileName = `${snakeCase(fileName)}.${fileExt}`;

    uploadFile(formattedFileName, downloadUrl, accessToken);

    res.status(200).send(`Uploaded ${formattedFileName} to Google Storage Bucket: ${bucketName}`)
}