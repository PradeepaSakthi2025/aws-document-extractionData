import React, { useState } from 'react';
import rawFieldMapping from './form_field_mapping.json';

interface ExtractedData {
  [key: string]: any;
}

interface FieldMeta {
  label: string;
  placeholder: string;
}

type FieldMapping = {
  [key: string]: FieldMeta;
};


function App2() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ExtractedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const fileUpload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);


    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/upload-file", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to process document");
      }

      const data: ExtractedData = await response.json();
      setFormData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 className='font-bold'>Document Extractor</h2>
      <label htmlFor="formFileSm">Upload File</label>
      <input type="file" onChange={onFileUpload} />
      {imageSrc && <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />}

      <button onClick={fileUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {formData && (
        <form>
          {Object.entries(formData).map(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value)) {
              return (
                <div key={key} style={{ marginBottom: '20px' }}>
                  <h3>{key}</h3>
                  <ul>
                    {Object.entries(value).map(([subKey, subVal]) => (
                      <li key={subKey}>
                        <strong>{subKey}:</strong> {String(subVal)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

          })}
        </form>
      )}
    </div>
  );
}

export default App2;
