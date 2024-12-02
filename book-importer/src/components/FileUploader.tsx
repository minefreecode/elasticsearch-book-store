"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      setJsonData([]);
      setUploadProgress(0);
    },
  });

  const processCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvText = e.target.result;
      try {
        Papa.parse(csvText, {
          complete: (result) => {
            setJsonData(result.data);
          },
          header: true,
          skipEmptyLines: true,
        });
      } catch (error) {
        console.error("Erro ao processar o CSV:", error);
      }
    };

    reader.onprogress = (e: ProgressEvent<FileReader>) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(progress);
      }
    };

    reader.readAsText(file);
    console.log(jsonData);
  };

  const handleUpload = () => {
    if (file) {
      processCsv(file);
    }
  };

  return (
    <div className="w-[420px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Import books from a CSV file
      </h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-md mb-4 hover:cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-green-600">{file.name}</p>
        ) : (
          <p className="text-gray-600">
            Drag & Drop or{" "}
            <span className="text-blue-500 hover:underline">Choose File</span>{" "}
            to upload (.csv)
          </p>
        )}
      </div>

      {uploadProgress > 0 && (
        <div className="relative pt-1 mb-4">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200">
                Uploading
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {uploadProgress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
            ></div>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`w-full bg-green-500 text-white p-2 rounded-md ${
          file ? "" : "cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Import
      </button>
    </div>
  );
}
