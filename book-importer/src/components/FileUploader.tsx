"use client";

import { useUploadBooks } from "@/service/hooks";
import { Book } from "@/types/book";
import { parseCVSToJSON } from "@/utils/functions/parseCSVToJSON";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadBooks = useUploadBooks();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = () => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result as string;
        const parsedData = parseCVSToJSON(csvData) as Book[];

        const batchSize = 100;
        const batches = [];

        for (let i = 0; i < parsedData.length; i += batchSize) {
          batches.push(parsedData.slice(i, i + batchSize));
        }

        for (const batch of batches) {
          uploadBooks.mutateAsync(batch);
        }

        setIsLoading(false);

        toast.success(
          `File processed successfully! Total: ${parsedData.length} lines!`
        );
      };
      reader.readAsText(file);
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

      <button
        onClick={handleUpload}
        className={`w-full bg-green-500 text-white p-2 rounded-md enabled:hover:bg-green-800 ${
          file ? "" : "cursor-not-allowed"
        }`}
        disabled={!file || isLoading}
      >
        {isLoading ? "Loading..." : "Import"}
      </button>

      <ToastContainer />
    </div>
  );
}
