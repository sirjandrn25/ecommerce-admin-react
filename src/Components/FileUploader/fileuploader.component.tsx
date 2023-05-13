import Icon from "@Components/Icon/icon.component";
import { FileUploaderIcon } from "@Constants/imageMapping.constants";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useFileUploader from "./useFileUploader.hook";
import { EmptyFunction } from "@Utils/common.utils";

const FileUploader = ({ children, onChange = EmptyFunction }: any) => {
  const { uploading, fileUploadFunc } = useFileUploader();
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const uploadedFiles = await fileUploadFunc(acceptedFiles);
      onChange(uploadedFiles);

      // Do something with the files
    },
    [fileUploadFunc, onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {!children ? (
        <DefaultUploaderUI isDragActive={isDragActive} {...{ uploading }} />
      ) : (
        children({ uploading })
      )}
    </div>
  );
};

const DefaultUploaderUI = ({ isDragActive, uploading }: any) => {
  return (
    <div
      className={`items-center justify-center gap-2 p-4 text-sm border border-dashed rounded ${
        uploading
          ? "pointer-event-none bg-base-200"
          : "cursor-pointer bg-base-200/20"
      }  row-flex`}
    >
      <Icon source={FileUploaderIcon} isReactIcon />
      {isDragActive ? (
        <div>Dragging files</div>
      ) : (
        <div className="text-base-primary">
          Files{uploading ? "Uploading ..." : " Uploads"}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
