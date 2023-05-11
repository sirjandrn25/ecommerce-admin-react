import Icon from "@Components/Icon/icon.component";
import { FileUploaderIcon } from "@Constants/imageMapping.constants";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useFileUploader from "./useFileUploader.hook";

const FileUploader = ({ children }: any) => {
  const { uploading, fileUploadFunc } = useFileUploader();
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      console.log({ acceptedFiles });
      const uploadedFiles = await fileUploadFunc(acceptedFiles);
      console.log({ uploadedFiles });
      // Do something with the files
    },
    [fileUploadFunc]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {!children ? (
        <DefaultUploaderUI isDragActive={isDragActive} />
      ) : (
        children({ uploading })
      )}
    </div>
  );
};

const DefaultUploaderUI = ({ isDragActive }: any) => {
  return (
    <div className="items-center justify-center gap-2 p-4 text-sm border border-dashed rounded cursor-pointer bg-base-200/20 row-flex">
      <Icon source={FileUploaderIcon} isReactIcon />
      {isDragActive ? (
        <div>Dragging files</div>
      ) : (
        <div className="text-base-primary">Files Uploads</div>
      )}
    </div>
  );
};

export default FileUploader;
