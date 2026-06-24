const https = require("https");

module.exports = async function (context, req) {
  try {
    const account = process.env.STORAGE_ACCOUNT_NAME;
    const container = "mmpublicdocuments";
    const sas = process.env.STORAGE_SAS_TOKEN;

    const url = `https://${account}.blob.core.windows.net/${container}?restype=container&comp=list&${sas}`;

    const xml = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });

      }).on("error", (err) => {
        reject(err);
      });
    });

    const docs = [];
    const matches = xml.match(/<Name>(.*?)<\/Name>/g);

    if (matches) {
      matches.forEach((m) => {
        const name = m.replace("<Name>", "").replace("</Name>", "");
        docs.push({
          id: name,
          title: name,
          url: `https://${account}.blob.core.windows.net/${container}/${name}`
        });
      });
    }

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: docs
    };

  } catch (err) {
    context.log.error("ERROR:", err);

    context.res = {
      status: 500,
      body: err.toString()
    };
  }
};
