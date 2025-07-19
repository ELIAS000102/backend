// service/azureBlobService.js
const { BlobServiceClient } = require("@azure/storage-blob");

const AZURE_STORAGE_CONNECTION_STRING = ""; // Reemplaza con tu cadena de conexión
const containerName = "imagenes-productos";

const uploadFile = async (fileName, buffer) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
git
  await containerClient.createIfNotExists({ access: "container" });

  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.uploadData(buffer);

  return blockBlobClient.url;
};

module.exports = { uploadFile };
