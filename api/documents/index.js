const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
  try {
    const connectionString = process.env.AzureWebJobsStorage;
    const containerName = "mmpublicdocuments"; 
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    const containerClient =
      blobServiceClient.getContainerClient(containerName);

    const documents = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const fileName = blob.name;

      documents.push({
        id: fileName,
        title: fileName,
        description: "Document from Blob Storage",
        category: "General",
        url: `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${fileName}`,
        size: blob.properties.contentLength,
        lastModified: blob.properties.lastModified
      });
    }

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: documents || []
    };

  } catch (error) {
    context.log.error("Error retrieving blobs:", error);    
    context.res = {
      status: 500,
      body: JSON.stringify({
        error: "Error retrieving documents",
        details: error.message
      })
    };
  }
};
