import React, { useState } from "react";
import UploadFile from "./UploadFile";
import dummyData from "../dummyData.json";
import ShowData from "./ShowData";
import { json } from "stream/consumers";

interface ExtractedData {
  [key: string]: any;
}

const useApi = true; // Toggle to false to use dummyData.json

export default function Wizard() {
  const [activeTab, setActiveTab] = useState(1);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState<ExtractedData>({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
  } | null>(null);

  interface HandleCompleteParams {
    data: ExtractedData;
    imageUrl?: string | null;
    fileInfo?: { name: string; size: number; type: string } | null;
  }

  const handleComplete = ({
    data,
    imageUrl,
    fileInfo,
  }: HandleCompleteParams) => {
    const formattedData = {
      json: data,
      keyValuePairs: data.keyValuePairs || data,
    };
    setFormData(data);
    setUploadedImageUrl(imageUrl || null);
    setFileInfo(fileInfo || null);
    setUploadComplete(true);
    setActiveTab(2);
    console.log("formatted data", formattedData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tab Headers */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 1
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Upload Image
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 2
              ? "border-b-2 border-blue-600 font-semibold"
              : uploadComplete
              ? "text-blue-600"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!uploadComplete}
          onClick={() => {
            if (uploadComplete) setActiveTab(2);
          }}
        >
          Extracted Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 1 && (
          <UploadFile onSubmit={handleComplete} useApi={useApi} />
        )}

        {activeTab === 2 && (
          <ShowData
            data={useApi ? formData : dummyData}
            imageUrl={uploadedImageUrl || ""}
            fileInfo={
              fileInfo || {
                name: "Driving Licence",
                size: 0,
                type: "image/png",
              }
            }
          />
        )}
      </div>
    </div>
  );
}
