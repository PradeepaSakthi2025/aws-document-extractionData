import React, { useState } from "react";
import UploadFile from "./UploadFile";
import dummyData from "../dummyData.json";
import ShowData from "./ShowData";

interface ExtractedData {
  [key: string]: any;
}

export default function Wizard() {
  const [activeTab, setActiveTab] = useState(1);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState<ExtractedData>({});
  const [ uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<any>(dummyData);
  const [fileData, setFileData] = useState<File | null>(null);

  interface HandleCompleteParams {
    data: ExtractedData;
    imageUrl?: string | null;
    fileInfo?:  object | null;
  }

  const handleComplete = ({ data, imageUrl , fileInfo}: HandleCompleteParams) => {
    setFormData(data);
    setUploadComplete(true);
    setUploadedImageUrl(imageUrl || null); // Ensure imageUrl is set
    setActiveTab(2);
    //setFileData(fileInfo instanceof File ? fileInfo : null); // Store the file data if needed
    //setJsonData(data); // Update jsonData with the extracted data
    console.log("Form Data:", data,imageUrl, "File Data:", fileInfo);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tab Headers */}
      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 1 ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab(1)}
        >
          Upload Image
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeTab === 2 ? 'border-b-2 border-blue-600 font-semibold' : uploadComplete ? 'text-blue-600' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!uploadComplete}
          onClick={() => { if (uploadComplete) setActiveTab(2);   }}
        >
          Extracted Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 1 && (
          <UploadFile onSubmit={handleComplete}
           />
        )}

        {activeTab === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
            
            <ShowData  
            data={jsonData} 
            imageUrl={uploadedImageUrl || ""} 
            fileInfo={{
              name: "Driving Licence" ,// Use the file name from URL or a default
              size: 0, // Default value, update if you have the actual file size
              type: "png" // Set a default type or use the actual type if available
            }}/>
          </div>
        )}
      </div>
    </div>
  );
}