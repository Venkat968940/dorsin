import { pdfjs } from "react-pdf";
import {
  validateAllFileFormat,
  validateSpecificFileFormat,
} from "./CommonUtils";
import { Alert, Snackbar } from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function containsXSS(content) {
  const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  return xssPattern.test(content);
}

const searchForJavaScriptInPDF = (content) => {
  const jsPatterns = [
    /\/JS/,
    /\/JavaScript/,
    /\/S\s*\/JavaScript/,
    /<iframe[^>]*\sonload=["']([^"]+)["'][^>]*>/g,
    /document\.write\(/g,
    /document\.writeln\(/g,
    /document\.domain/g,
    /innerHTML/g,
    /outerHTML/g,
    /insertAdjacentHTML/g,
    /onevent/g,
    /addEventListener/g, // Alternative to onevent
    /appendChild/g,
    /insertBefore/g,
    /before/g,
    /after/g,
    /prepend/g,
    /append/g, // Alternative to appendChild
    /cloneNode/g,
    /createElement/g,
    /createTextNode/g,
    /normalize/g,
    /textContent/g,
    /innerText/g,
    /innerHTML/g,
    /outerHTML/g,
    /insertAdjacentHTML/g,
    /replaceWith/g,
    /wrap/g,
    /wrapInner/g,
    /wrapAll/g,
    /has/g,
    /constructor/g,
    /init/g,
    /index/g,
    /jQuery\.parseHTML/g,
    /\$\.parseHTML/g, // jQuery alias
  ];
  for (const pattern of jsPatterns) {
    if (pattern.test(content)) {
      return true;
    }
  }
  return false;
};

const readFileAndCheckForJavaScript = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const content = reader.result;
      const containsJavaScript = searchForJavaScriptInPDF(content);
      if (containsJavaScript) {
        <Snackbar open={true} autoHideDuration={5000}>
          <Alert
            message="The file contains malicious content."
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          />
        </Snackbar>;
        resolve(true);
      } else {
        resolve(false);
      }
    };
    reader.readAsText(file);
  });
};

export const validateLimitedFile = async (
  file,
  sendNotification,
  handleContextChange
) => {
  const firstDotIndex = file.name.indexOf(".");
  const remainingName = file.name.substring(firstDotIndex + 1);

  if (remainingName.includes(".")) {
    sendNotification({
      message:
        "Invalid Image type. Please upload a Image of type: JPG, JPEG, PNG.",
      variant: "error",
    });
    handleContextChange("isLoading", false);
    return true;
  }
  if (file.type === "application/pdf") {
    const formatErrorMessage = await validateSpecificFileFormat(file);
    if (formatErrorMessage) {
      sendNotification({ message: formatErrorMessage, variant: "error" });
      handleContextChange("isLoading", false);
      return true;
    }
    const formData = new FormData();
    formData.append("file", file);
    handleContextChange(
      "isLoading",
      true,
      "Please wait, we are validating the file."
    );
    return readFileAndCheckForJavaScript(
      file,
      sendNotification,
      handleContextChange
    );
  }
  handleContextChange("isLoading", false);
  return false;
};

export const validateAllFile = async (
  file,
  dispatch,
  sendNotification,
  handleContextChange
) => {
  const firstDotIndex = file.name.indexOf(".");
  const remainingName = file.name.substring(firstDotIndex + 1);
  const allowedExtensions = [
    "pdf",
    "png",
    "jpeg",
    "jpg",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "mp4",
  ];

  if (remainingName.includes(".")) {
    sendNotification({
      message: `Invalid file type. Please upload a file of type: ${allowedExtensions.join(
        ", "
      )}.`,
      variant: "error",
    });
    handleContextChange("isLoading", false);
    return true;
  }
  if (file.type === "application/pdf") {
    const formatErrorMessage = await validateAllFileFormat(file);
    if (formatErrorMessage) {
      sendNotification({ message: formatErrorMessage, variant: "error" });
      handleContextChange("isLoading", false);
      return true;
    }
    const formData = new FormData();
    formData.append("file", file);
    handleContextChange(
      "isLoading",
      true,
      "Please wait, we are validating the file."
    );
    return readFileAndCheckForJavaScript(
      file,
      sendNotification,
      handleContextChange
    );
  }
  handleContextChange("isLoading", false);
  return false;
};

export const validateAllFilesForModel = async (
  file,
  dispatch,
  sendNotification,
  setIsLoading,
  fileParent
) => {
  const firstDotIndex = file.name.indexOf(".");
  const remainingName = file.name.substring(firstDotIndex + 1);
  const allowedExtensions = [
    "pdf",
    "png",
    "jpeg",
    "jpg",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "mp4",
  ];

  if (remainingName.includes(".")) {
    sendNotification({
      message: `Invalid file type. Please upload a file of type: ${allowedExtensions.join(
        ", "
      )}.`,
      variant: "error",
    });
    setIsLoading(fileParent ? { [fileParent]: false } : false);
    return true;
  }
  if (file.type === "application/pdf") {
    const formatErrorMessage = await validateAllFileFormat(file);
    if (formatErrorMessage) {
      sendNotification({ message: formatErrorMessage, variant: "error" });
      setIsLoading(fileParent ? { [fileParent]: false } : false);
      return true;
    }
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(fileParent ? { [fileParent]: true } : true);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const content = reader.result;
        const containsJavaScript = searchForJavaScriptInPDF(content);
        if (containsJavaScript) {
          sendNotification({
            message: "The file contains malicious content.",
            variant: "error",
          });
          setIsLoading(fileParent ? { [fileParent]: true } : true);
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }
  setIsLoading(fileParent ? { [fileParent]: false } : false);
  return false;
};

function containsJavaScriptCode(text) {
  const javascriptRegex =
    /<script[\s\S]*?<\/rap>|javascript:|\bon\w+=['"]?[^'"]+['"]?/i;
  return javascriptRegex.test(text);
}

function containsPotentiallyHarmfulContent(text) {
  const harmfulContentRegex =
    /<script|alert\(|document\.write\(|\bonload=|javascript:/i;
  return harmfulContentRegex.test(text);
}

function isURL(str) {
  // Regular expression pattern to match URLs
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  // Check if the string matches the pattern
  return urlPattern.test(str);
}

const checkAnnotations = async (pageAnnotations) => {
  let error = false;
  pageAnnotations.forEach((annotation) => {
    if (!annotation.url && annotation.unsafeUrl) {
      error = true;
    } else if (
      annotation.url &&
      annotation.url !== "" &&
      (annotation.url.includes("javascript:") ||
        containsJavaScriptCode(annotation.url) ||
        containsPotentiallyHarmfulContent(annotation.url) ||
        !isURL(annotation.url))
    ) {
      error = true;
    } else if (
      annotation.unsafeUrl &&
      annotation.unsafeUrl !== "" &&
      (annotation.unsafeUrl.includes("javascript:") ||
        containsJavaScriptCode(annotation.unsafeUrl) ||
        containsPotentiallyHarmfulContent(annotation.unsafeUrl) ||
        !isURL(annotation.url))
    ) {
      error = true;
    }
  });
  return error;
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function checkPdfContent(pdf) {
  let containsScript = false;
  let containsPotentiallyHarmful = false;
  let annotationError = false;
  let isHiddenWrapped = false;

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const pageAnnotations = await page.getAnnotations();
    if (pageAnnotations.length > 0) {
      const currentAnnotationError = await checkAnnotations(pageAnnotations);
      annotationError = annotationError || currentAnnotationError;
    }
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    const allText = textContent.items.map((item) => item.str).join(" ");
    const hiddenText = textContent.items
      .filter((item) => item.transform[0] === 0 && item.transform[3] === 0)
      .map((item) => item.str)
      .join(" ");
    const fullText = allText + " " + hiddenText;
    containsScript =
      containsScript ||
      containsJavaScriptCode(pageText + hiddenText) ||
      containsXSS(pageText + hiddenText);
    containsPotentiallyHarmful =
      containsPotentiallyHarmful ||
      containsPotentiallyHarmfulContent(pageText + hiddenText);
    const regex = new RegExp(
      `<[^>]*>\\s*${escapeRegExp(pageText)}\\s*</[^>]*>`,
      "i"
    );
    isHiddenWrapped = isHiddenWrapped || regex.test(fullText);
  }
  return {
    containsScript,
    containsPotentiallyHarmful,
    containsAnnotationError: annotationError,
    isHiddenWrapped,
  };
}

async function parseAndCheckPdf(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      pdfjs
        .getDocument(arrayBuffer)
        .promise.then(async (pdf) => {
          const checkResults = await checkPdfContent(pdf);
          resolve(checkResults);
        })
        .catch(reject);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

async function maliciousPDFCheck(file) {
  return new Promise((resolve, reject) => {
    const filePath = file;
    parseAndCheckPdf(filePath)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default maliciousPDFCheck;
