import { useContext } from "react";
import FileContext from "../../utils/FileContext";

const PDFViewer = () => {
  const { file } = useContext(FileContext);
  console.log(file, "File:");

  return (
    <div>
      {/* Display the PDF in an iframe */}
      <iframe
        src={file}
        width="100%"
        height="100%"
        title="PDF Viewer"
        style={{ border: "none", minHeight:'99.3dvh' }}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
