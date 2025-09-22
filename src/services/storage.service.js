const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(fileBuffer, fileName, mimeType) {
    // fileBuffer: Buffer from multer (req.file.buffer)
    const base64 = Buffer.isBuffer(fileBuffer) ? fileBuffer.toString('base64') : fileBuffer;
    const fileData = `data:${mimeType || 'application/octet-stream'};base64,${base64}`;
    const result = await imagekit.upload({
        file: fileData,
        fileName: fileName,
    });
    return result;   
}

async function deleteFile(fileId) {
    const result = await imagekit.deleteFile(fileId);
    return result;
}

module.exports = { uploadFile, deleteFile }