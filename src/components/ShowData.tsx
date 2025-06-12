import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface ShowDataProps {
  data: {
    json: any;
    keyValuePairs: {
      [key: string]: string;
    };
  };
  imageUrl: string;
  fileInfo: {
    name: string;
    size: number;
    type: string;
  };
}

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowData: React.FC<ShowDataProps> = ({ data, imageUrl, fileInfo }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const kv = data.keyValuePairs;
  console.log(fileInfo.type, "File Info");
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileInfo.name.split('.')[0]}data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    // Simulate successful submit
    setOpenSnackbar(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[90vh] p-6 bg-gradient-to-br from-gray-300 to-gray-100 text-white">
      
      {/* Image Preview and Info */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden mb-4">
          <img src={imageUrl} alt="Uploaded ID" className="w-64 h-auto object-cover" />
        </div>

        <div className="text-left">
          <h2 className="text-xl font-bold mb-2">File Info</h2>
          <p><strong>Name:</strong> {fileInfo.name}</p>
          <p><strong>Size:</strong> {(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Type:</strong> {fileInfo.type}</p>
        </div>
      </div>

      {/* Extracted Form Data */}
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-xl shadow-inner border border-blue-400">
        <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Extracted Info</h3>
        <div className="space-y-3 text-left text-sm md:text-base">
          <p><strong>Name:</strong> {kv.FIRST_NAME} {kv.MIDDLE_NAME !== "N/A" ? kv.MIDDLE_NAME : ''} {kv.LAST_NAME}</p>
          <p><strong>Date of Birth:</strong> {kv.DATE_OF_BIRTH}</p>
          <p><strong>Address:</strong> {kv.ADDRESS}, {kv.CITY_IN_ADDRESS}, {kv.STATE_NAME} {kv.ZIP_CODE_IN_ADDRESS}</p>
          <p><strong>Issued:</strong> {kv.DATE_OF_ISSUE}</p>
          <p><strong>Expires:</strong> {kv.EXPIRATION_DATE}</p>
          <p><strong>Document #:</strong> {kv.DOCUMENT_NUMBER}</p>
          <p><strong>Class:</strong> {kv.CLASS}</p>
          <p><strong>Endorsements:</strong> {kv.ENDORSEMENTS}</p>
          <p><strong>Restrictions:</strong> {kv.RESTRICTIONS}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-10 w-full max-w-xl">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Download
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowData;