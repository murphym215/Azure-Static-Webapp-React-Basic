module.exports = async function (context, req) {
  try {
    const account = process.env.STORAGE_ACCOUNT_NAME;
    const container = "docs"; // change if needed
    const sas = process.env.STORAGE_SAS_TOKEN; // NEW

    const url = `https://${account}.blob.core.windows.net/${container}?restype=container&comp=list&${sas}`;

    const response = await fetch(url);
    const xmlText = await response.text();

    // Parse XML
    const blobList = [];
    const matches = xmlText.match(/<Name>(.*?)<\/Name>/g);

    if (matches) {
      matches.forEach((match) => {
        const name = match.replace("<Name>", "").replace("</Name>", "");
        blobList.push({
          id: name,
          title: name,
          url: `https://${account}.blob.core.windows.net/${container}/${name}`
        });
      });
    }

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: blobList
    };

  } catch (error) {
    context.log.error("ERROR:", error);

    context.res = {
      status: 500,
      body: error.toString()
    };
  }
};
