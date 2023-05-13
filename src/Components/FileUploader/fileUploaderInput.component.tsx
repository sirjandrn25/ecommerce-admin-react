import React from "react";
import FileUploader, { FileUploaderInterface } from "./fileuploader.component";

interface FileUPloaderInputInterface extends FileUploaderInterface {
  label: string;
  error?: string;
  isRequired?: boolean;
  files?: string[];
}

const FileUploaderInput = ({
  label,
  error,
  isRequired,
  files = [],
  ...rest
}: FileUPloaderInputInterface) => {
  return (
    <div className="gap-2 col-flex">
      {label && (
        <label
          htmlFor="input_id"
          className={`label-text font-medium ${error && "text-error"} `}
        >
          <span>{label}</span>{" "}
          {isRequired && <span className="text-error">*</span>}
        </label>
      )}
      <FileUploader {...rest} />
      {error && <div className="pl-1 mt-1 text-xs text-error">{error}</div>}
      {files?.length > 0 && (
        <div className="text-xs font-medium">
          {files?.length} Files uploaded
        </div>
      )}
    </div>
  );
};

export default FileUploaderInput;
