import React from 'react';
import UploadFile from './UploadFile';

interface Props {
  onSubmitSuccess: (data?: any) => void;
}

const UploadFileWrapper: React.FC<Props> = ({ onSubmitSuccess }) => {
  return (
    <UploadFile onSubmit={onSubmitSuccess} />
  );
};

export default UploadFileWrapper;