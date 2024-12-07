import React from "react";
import styles from "./ImageUploader.module.css";
import Dropzone from "react-dropzone";

interface ImageUploaderProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUploader = ({ setSelectedImage }: ImageUploaderProps) => {
  return (
    <Dropzone
      accept={{
        "image/png": [],
        "image/jpeg": [],
      }}
      maxFiles={1}
      maxSize={2 * 1024 * 1024}
      onDrop={(acceptedFiles) => setSelectedImage(acceptedFiles[0])}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div {...getRootProps()} className={styles.container}>
          <input {...getInputProps()} />
          <p>Arraste e solte uma imagem</p>
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUploader;
