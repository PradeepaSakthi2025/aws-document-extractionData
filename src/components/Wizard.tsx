import React, { useState } from "react";
import UploadFile from "./UploadFile";

interface ExtractedData {
  [key: string]: any;
}

export default function Wizard() {
  const [activeTab, setActiveTab] = useState(1);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState<ExtractedData>({});
  const [ uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleComplete = (data: ExtractedData) => {
    setFormData(data);
    setUploadComplete(true);
    setActiveTab(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tab Headers */}
      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 1 ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab(1)}
        >
          Upload
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeTab === 2 ? 'border-b-2 border-blue-600 font-semibold' : uploadComplete ? 'text-blue-600' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!uploadComplete}
          onClick={() => { if (uploadComplete) setActiveTab(2); }}
        >
          Extracted Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 1 && (
          <UploadFile onSubmit={
            (data, imageUrl) => {
              setFormData(data);
              handleComplete(data);
              setUploadedImageUrl(imageUrl); // Assuming data contains imageUrl
              setActiveTab(2);
            } 
          } />
        )}

        {activeTab === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
            {Object.keys(formData).length === 0
              ? <p className="text-gray-500">No data found.</p>
              : (
              <ul className="space-y-2">
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key} className="flex justify-between bg-gray-100 p-3 rounded">
                    <span className="font-medium">{key}</span>
                    <span>{String(value)}</span>
                  </li>
                ))}
              </ul>)}
          </div>
        )}
      </div>
    </div>
  );
}