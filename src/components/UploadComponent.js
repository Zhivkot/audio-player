import React from 'react';
import { FileUploader, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function UploadComponent() {
  const onSuccess = (event) => {
    console.log('File uploaded successfully:', event.key);
  };

  return (
    <div className="upload-container">
      <h1>Upload your audio files</h1>
      <div className="file-uploader">
        <FileUploader
          accessLevel="private"
          acceptedFileTypes={['audio/*']}
          variation="drop" // Adjust the folder path to "private/audio"
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}

export default withAuthenticator(UploadComponent);
