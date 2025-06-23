import React, { useState, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ShowDataProps {
  data: {
    [key: string]: any;
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
  const kv = data.keyValuePairs || data || {};
  const formRef = useRef<HTMLFormElement>(null);

  const handleDownloadPDF = () => {
    if (!formRef.current) return;

    // Clone the form DOM
    const clonedForm = formRef.current.cloneNode(true) as HTMLElement;

    // Apply black text on white background for the PDF
    clonedForm.style.color = "black!important";
    clonedForm.style.backgroundColor = "white";

    // Hide the clone visually but keep in DOM for canvas
    clonedForm.style.position = "absolute";
    clonedForm.style.left = "-9999px";
    document.body.appendChild(clonedForm);

    html2canvas(clonedForm).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("extracted-data.pdf");

      // Remove the cloned DOM
      document.body.removeChild(clonedForm);
    });
  };

  const handleSubmit = () => {
    setOpenSnackbar(true);
  };

  const formatDate = (str: string) => {
    if (!str || !str.includes("/")) return "";
    const [month, day, year] = str.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[90vh] p-6 bg-gradient-to-br from-gray-300 to-gray-100 text-white">
      {/* Image and File Info */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden mb-4">
          <img
            src={imageUrl}
            alt="Uploaded ID"
            className="w-64 h-auto object-cover"
          />
        </div>
        <div className="text-left text-white">
          <h2 className="text-xl font-bold mb-2">File Info</h2>
          <p>
            <strong>Name:</strong> {fileInfo.name}
          </p>
          <p>
            <strong>Size:</strong> {(fileInfo.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <p>
            <strong>Type:</strong> {fileInfo.type}
          </p>
        </div>
      </div>

      {/* Form Layout */}
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl shadow-inner border border-blue-400">
        <h3 className="text-2xl font-semibold mb-4 border-b pb-2 text-white">
          Extracted Info
        </h3>

        <form ref={formRef} className="grid grid-cols-1 gap-4 text-black">
          {/* Two-column layout with label on the left */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              First Name:
            </label>
            <input
              type="text"
              disabled
              value={kv.FIRST_NAME || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Last Name:
            </label>
            <input
              type="text"
              disabled
              value={kv.LAST_NAME || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Middle Name:
            </label>
            <input
              type="text"
              disabled
              value={kv.MIDDLE_NAME !== "N/A" ? kv.MIDDLE_NAME : ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Document :
            </label>
            <input
              type="text"
              disabled
              value={kv.DOCUMENT_NUMBER || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Date of Birth:
            </label>
            <input
              type="date"
              disabled
              value={formatDate(kv.DATE_OF_BIRTH)}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Date of Issue:
            </label>
            <input
              type="date"
              disabled
              value={formatDate(kv.DATE_OF_ISSUE)}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Expiration Date:
            </label>
            <input
              type="date"
              disabled
              value={formatDate(kv.EXPIRATION_DATE)}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Class:
            </label>
            <input
              type="text"
              disabled
              value={kv.CLASS || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Address:
            </label>
            <input
              type="text"
              disabled
              value={`${kv.ADDRESS || ""}, ${kv.CITY_IN_ADDRESS || ""}, ${
                kv.STATE_NAME || ""
              } ${kv.ZIP_CODE_IN_ADDRESS || ""}`}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Endorsements:
            </label>
            <input
              type="text"
              disabled
              value={kv.ENDORSEMENTS || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 items-center">
            <label className="col-span-3 font-semibold text-white text-right pr-4">
              Restrictions:
            </label>
            <input
              type="text"
              disabled
              value={kv.RESTRICTIONS || ""}
              className="col-span-9 p-2 rounded bg-gray-200 w-full"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-10 space-x-4">
          <button
            onClick={handleDownloadPDF}
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
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowData;
