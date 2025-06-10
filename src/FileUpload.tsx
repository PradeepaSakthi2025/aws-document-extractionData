import React, { useState } from 'react';

interface ExtractedData {
  [key: string]: any;
}
interface FileUploadProps {
  setFile: (file: { type: string; file: string; imageUrl: string }) => void;
  setFormData: (data: ExtractedData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}


const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(',')[1] || '';
        setFile({
          type: file.type,
          file: base64,
          imageUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    const form = new FormData();
    form.append('file', selectedFile);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/upload-file', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      const data = await response.json();
      setFormData(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>

      <label htmlFor="formFileSm">Upload File</label>
      <input type="file" onChange={onFileUpload} />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
};

export default FileUpload;
