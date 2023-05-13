import Icon from "@Components/Icon/icon.component";
import { FileUploaderIcon } from "@Constants/imageMapping.constants";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useFileUploader from "./useFileUploader.hook";
import { EmptyFunction } from "@Utils/common.utils";
import Toast from "@Utils/toast.utils";

export interface FileUploaderInterface {
  children?: any;
  onChange?: (files: any) => void;
  maxFiles?: number;
  isMultiple?: boolean;
}

const FileUploader = ({
  children,
  onChange = EmptyFunction,
  isMultiple = true,
  maxFiles = 5,
}: FileUploaderInterface) => {
  const { uploading, fileUploadFunc } = useFileUploader();
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      if (acceptedFiles?.length > 0) {
        const uploadedFiles = await fileUploadFunc(acceptedFiles);
        Toast.success({
          message: "Successfully uploaded files",
        });
        onChange(uploadedFiles);
      } else {
        Toast.error({
          message: `Maximum ${maxFiles} files allowed to upload`,
        });
      }

      // Do something with the files
    },
    [fileUploadFunc, maxFiles, onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading,
    multiple: isMultiple,
    maxFiles,
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
