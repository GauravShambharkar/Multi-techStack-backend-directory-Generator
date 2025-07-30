import React from "react";
import { useState } from "react";
import {
  FolderPlus,
  FilePlus,
  Trash2,
  Download,
  Folder,
  FileText,
  Plus,
  Minus,
} from "lucide-react";

import axios from "axios";
import { saveAs } from "file-saver";
import { useEffect } from "react";

const Form = () => {
  const [directoryName, setDirectoryName] = useState([""]);
  const [folderName, setFolderName] = useState([""]);
  const [fileName, setFileName] = useState([[""]]);

  const handleValidation = () => {
    for (let i = 0; i < fileName.length; i++) {
      for (let j = 0; j < fileName[i].length; j++) {
        if (fileName[i][j].includes(".")) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      alert("Please enter a valid file name with extension");
      return;
    }

    const response = await axios.post(
      `http://localhost:3000/generate`,
      {
        directoryName: directoryName,
        folderName: folderName,
        fileName: fileName,
      },
      {
        responseType: "blob", // Important for file download
      }
    );
    saveAs(response.data, `${directoryName}.zip`);
  };

  const handleDirectoryChange = (index, value) => {
    const newDirectories = [...directoryName];
    newDirectories[index] = value;
    setDirectoryName(newDirectories);
  };

  const handleFolderChange = (folderIndex, value) => {
    const newFolders = [...folderName];
    newFolders[folderIndex] = value;
    setFolderName(newFolders);
  };

  const handleFileChange = (folderIndex, fileIndex, value) => {
    const newFiles = [...fileName];
    newFiles[folderIndex][fileIndex] = value;
    setFileName(newFiles);
  };

  const addFolder = () => {
    setFolderName([...folderName, ""]);
    setFileName([...fileName, [""]]);
  };

  const addFile = (folderIndex) => {
    const newFiles = [...fileName];
    newFiles[folderIndex] = [...newFiles[folderIndex], ""];
    setFileName(newFiles);
  };

  const deleteFolder = (index) => {
    if (folderName.length > 1) {
      const newFolders = folderName.filter((_, i) => i !== index);
      const newFiles = fileName.filter((_, i) => i !== index);
      setFolderName(newFolders);
      setFileName(newFiles);
    }
  };

  const deleteFile = (folderIndex, fileIndex) => {
    if (fileName[folderIndex].length > 1) {
      const newFiles = [...fileName];
      newFiles[folderIndex] = newFiles[folderIndex].filter(
        (_, i) => i !== fileIndex
      );
      setFileName(newFiles);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <FolderPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Directory Generator
            </h1>
            <p className="text-slate-600 text-lg">
              Create your project structure with ease
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
            <div className="p-8">
              {/* Directory Name */}
              <div className="mb-8">
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                  <Folder className="w-4 h-4 mr-2 text-blue-600" />
                  Root Directory Name
                </label>
                <input
                  value={directoryName[0]}
                  onChange={(e) => handleDirectoryChange(0, e.target.value)}
                  type="text"
                  placeholder="my-awesome-project"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200 text-slate-800 placeholder-slate-400
                          hover:border-slate-300"
                  required
                />
              </div>

              {/* Folders Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <FolderPlus className="w-5 h-5 mr-2 text-blue-600" />
                    Folders & Files
                  </h3>
                  <button
                    type="button"
                    onClick={addFolder}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700
                            text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800
                            transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Folder
                  </button>
                </div>

                {folderName.map((folder, folderIndex) => (
                  <div
                    key={folderIndex}
                    className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 
                            border border-slate-200/60 shadow-sm"
                  >
                    {/* Folder Name */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center text-sm font-medium text-slate-700">
                          <Folder className="w-4 h-4 mr-2 text-amber-600" />
                          Folder Name
                        </label>
                        {folderName.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteFolder(folderIndex)}
                            className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600
                                    text-sm font-medium rounded-lg hover:bg-red-100 transition-colors
                                    border border-red-200"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete Folder
                          </button>
                        )}
                      </div>
                      <input
                        value={folder}
                        onChange={(e) =>
                          handleFolderChange(folderIndex, e.target.value)
                        }
                        type="text"
                        placeholder="controllers, models, routes..."
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                transition-all duration-200 text-slate-800 placeholder-slate-400
                                hover:border-slate-300"
                      />
                    </div>

                    {/* Files Section */}
                    <div className="ml-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center text-sm font-medium text-slate-600">
                          <FileText className="w-4 h-4 mr-2 text-green-600" />
                          Files
                        </label>
                        <button
                          type="button"
                          onClick={() => addFile(folderIndex)}
                          className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-600
                                  text-sm font-medium rounded-lg hover:bg-green-100 transition-colors
                                  border border-green-200"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add File
                        </button>
                      </div>

                      <div className="space-y-3">
                        {fileName[folderIndex]?.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="flex items-center gap-3"
                          >
                            <div className="flex-1">
                              <input
                                value={file}
                                onChange={(e) =>
                                  handleFileChange(
                                    folderIndex,
                                    fileIndex,
                                    e.target.value
                                  )
                                }
                                type="text"
                                placeholder="index.js, controller.js, model.js..."
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                        transition-all duration-200 text-slate-800 placeholder-slate-400
                                        hover:border-slate-300 text-sm"
                              />
                            </div>
                            {fileName[folderIndex]?.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  deleteFile(folderIndex, fileIndex)
                                }
                                className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-500
                                        rounded-lg hover:bg-red-100 transition-colors border border-red-200
                                        hover:border-red-300"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700
                          hover:from-blue-700 hover:via-purple-700 hover:to-blue-800
                          text-white font-semibold py-4 px-6 rounded-2xl
                          transition-all duration-300 shadow-lg hover:shadow-xl
                          transform hover:scale-95 flex items-center justify-center gap-3
                          text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                  <Download className="w-5 h-5" />
                  Generate & Download Structure
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Create professional project structures in seconds ✨
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
