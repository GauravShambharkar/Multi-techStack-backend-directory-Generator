const { Router } = require("express");
const generateRoute = Router();
const archiver = require("archiver");
const path = require("path");

generateRoute.post("/generate", async (req, res) => {
  const { directoryName, folderName, fileName } = req.body;

  const archive = archiver("zip", { zlib: { level: 9 } });

  res.attachment(`${directoryName}.zip`);

  archive.pipe(res);

  try {
    folderName.forEach((folder, folderIndex) => {
      fileName[folderIndex].forEach((file) => {
        archive.append("", { name: `${directoryName}/${folder}/${file}` });
      });
    });

    await archive.finalize();
  } catch (err) {
    alert("Error creating archive: " + err.message);
    res.send({
      message: "Error creating archive",
      error: err.message,
    });
  }
});

module.exports = {
  generateRoute,
};
