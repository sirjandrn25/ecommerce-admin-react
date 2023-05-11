import { sendRequest } from "@Utils/service.utils";
import { useState } from "react";
import FileController from "src/Controllers/File/file.controller";

const useFileUploader = () => {
  const [uploading, setUploading] = useState<boolean>(false);

  const fileUploadFunc = async (files: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("files", files);
    const headers = { "Content-Type": "multipart/form-data" };

    const { success, response } = await sendRequest({
      end_point: FileController.upload(),
      method: "post",
      formData: formData,
      headers,
    });
    setUploading(false);
    if (success) {
      return response;
    }
    return [];
  };

  return {
    uploading,
    fileUploadFunc,
  };
};

export default useFileUploader;
