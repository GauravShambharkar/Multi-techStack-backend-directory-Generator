const express = require("express");
const cors = require("cors");
const archiver = require("archiver");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

const corsOption = {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const { folderName, fileName } = req.body;

  if (!folderName || !fileName) {
    return res
      .status(400)
      .json({ error: "Folder name and file name are required" });
  }

  try {
    // Create a ZIP archive in memory
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Set response headers for file download
    // res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${folderName}.zip"`
    );

    // Pipe the archive directly to the response
    archive.pipe(res);

    // Add the JavaScript file to the archive with the folder structure
    const fileContent = `console.log("Hello, World!");`;
    archive.append(fileContent, { name: `${folderName}/${fileName}.js` });

    // Finalize the archive
    await archive.finalize();
  } catch (err) {
    console.error("Error generating ZIP file:", err);
    res.status(500).json({ error: "Error generating file." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
