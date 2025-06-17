import { useState } from "react";
import FileContext from "./FileContext";

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);

  const setUploadedFile = (uploadedFile) => {
    setFile(uploadedFile);
  };

  return (
    <FileContext.Provider value={{ file, setUploadedFile }}>
      {children}
    </FileContext.Provider>
  );
};
