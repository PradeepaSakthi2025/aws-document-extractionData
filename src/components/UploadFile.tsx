import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface UploadFileProps {
  onSubmit: (jsonData: any, imageUrl: string) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be under 5MB');
        return;
      }
      setFile(file);
      setSelectedFile(file);
      setProgress(0);
      setIsUploading(true);
      setIsUploaded(false);
    }
  };

  useEffect(() => {
    if (isUploading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 2);
      }, 30);
      return () => clearTimeout(timer);
    }
    if (progress >= 100) {
      setTimeout(() => {
        setIsUploading(false);
        setIsUploaded(true);
      }, 300);
    }
  }, [progress, isUploading]);

  const handleRemove = () => {
    setFile(null);
    setSelectedFile(null);
    setIsUploading(false);
    setIsUploaded(false);
    setProgress(0);
  };

  const handleSubmit = () => {
    if (!file || !isUploaded) return;

    // Simulated extracted JSON data
    const extractedData = {
      keyValuePairs: {
        FIRST_NAME: "GARCIA",
        LAST_NAME: "MARIA",
        MIDDLE_NAME: "N/A",
        SUFFIX: "N/A",
        CITY_IN_ADDRESS: "BIGTOWN",
        ZIP_CODE_IN_ADDRESS: "02801",
        STATE_IN_ADDRESS: "MA",
        STATE_NAME: "MASSACHUSETTS",
        DOCUMENT_NUMBER: "736HDV7874JSB",
        EXPIRATION_DATE: "01/20/2028",
        DATE_OF_BIRTH: "03/18/2001",
        DATE_OF_ISSUE: "03/18/2018",
        ID_TYPE: "DRIVER LICENSE FRONT",
        ENDORSEMENTS: "NONE",
        VETERAN: "N/A",
        RESTRICTIONS: "NONE",
        CLASS: "D",
        ADDRESS: "100 MARKET STREET",
        COUNTY: "N/A",
        PLACE_OF_BIRTH: "N/A",
        MRZ_CODE: "N/A"
      },
      tables: []
    };

    const imageUrl = URL.createObjectURL(file);
    onSubmit(extractedData, imageUrl);
  };

  return (
    <div className="bg-gray-300 flex items-center justify-center p-4 text-white min-h-[80vh]">
      <div className="bg-gray-800 w-full max-w-sm rounded-xl p-6 text-center shadow-5xl">
        
        {/* Upload Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-b from-pink-400 to-blue-500 flex items-center justify-center overflow-hidden">
          {isUploaded ? (
            <span className="text-white text-4xl z-10">
              {FaCheck({})}
              
            </span>
          ) : (
            <>
              <span className="z-10 font-bold text-white">UPLOADING</span>
              {isUploading && (
                <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-full"
                  style={{ height: "100%", transition: 'height 0.4s ease-in-out' }}>
                  <svg
                    className="absolute bottom-0 w-full h-full animate-wave"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <path
                      fill="white"
                      fillOpacity="0.7"
                      d="M0,160L40,176C80,192,160,224,240,224C320,224,400,192,480,160C560,128,640,96,720,117.3C800,139,880,213,960,218.7C1040,224,1120,160,1200,133.3C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>

        {/* Progress Display */}
        <div className="text-lg font-medium">
          {isUploaded ? "Upload complete!" : `${progress}% completed `}
        </div>
        <div className="text-sm text-gray-400 mt-2">
          {isUploading ? "Please wait while we upload your file..." : "Select a file to upload."}
        </div>

        {/* File Name + Remove Icon */}
        {selectedFile && (
          <div className="mt-4 flex items-center justify-center gap-2 bg-gray-700 px-4 py-2 rounded-full text-sm">
            <span className="truncate max-w-[180px]">{selectedFile.name}</span>
            <button onClick={handleRemove}>
              <span className="text-red-400 hover:text-red-600 text-sm">
                {FaTimes({})}
           
              </span>
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <div className="mt-6">
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            id="fileUpload"
          />
          {!selectedFile && (
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full inline-block text-white font-semibold transition"
            >
              Choose File
            </label>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            className={`w-full py-2 px-4 rounded-full font-semibold transition ${
              isUploaded
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            disabled={!isUploaded}
            onClick={handleSubmit}
          >
            {isUploaded ? "Submit" : isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: waveMove 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UploadFile;