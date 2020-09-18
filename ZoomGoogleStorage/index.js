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

    await new Promise((resolve, reject) => {
        res.body.pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });

    const storageFileUrl = `https://storage.cloud.google.com/${bucketName}/${fileName}`;

    return storageFileUrl;
}

exports.uploadZoomRecordingToGoogleStorage = async (req, res) => {
    const { fileName, fileExt, downloadUrl, accessToken } = req.body;

    const formattedFileName = `${snakeCase(fileName)}.${fileExt}`;

    const storageFileUrl = await uploadFile(formattedFileName, downloadUrl, accessToken);

    const data = {
        message: `Uploaded ${formattedFileName} to Google Storage Bucket: ${bucketName}`,
        storageFileUrl: storageFileUrl
    };

    res.status(200).send(data);
};