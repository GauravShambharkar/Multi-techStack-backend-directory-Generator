import { useState } from "react";
import axios from "axios";

function App() {
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateAndDownload = async () => {
    if (!folderName.trim() || !fileName.trim()) {
      setError("Please enter both folder name and file name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/generate",
        {
          folderName: folderName.trim(),
          fileName: fileName.trim(),
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName.trim()}.zip`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear form
      setFolderName("");
      setFileName("");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate and download file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          File Generator
        </h1>
        <p className="text-gray-600 mb-8 text-center leading-relaxed">
          Generate a folder with a JavaScript file and download it as a ZIP
        </p>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="folderName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Folder Name:
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name (e.g., MyFolder)"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="fileName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              File Name:
            </label>
            <input
              id="fileName"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name (e.g., index)"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateAndDownload}
            disabled={isLoading || !folderName.trim() || !fileName.trim()}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              "Generate & Download"
            )}
          </button>
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            How it works:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">✓</span>
              Enter a folder name and file name
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">✓</span>
              Click "Generate & Download"
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">✓</span>
              Get a ZIP file containing your folder with a JavaScript file
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">✓</span>
              The JS file will contain:{" "}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                console.log("Hello, World!");
              </code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
