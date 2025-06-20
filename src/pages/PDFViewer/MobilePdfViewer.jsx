import React, { useState, useEffect, useRef } from "react";

const MobilePdfViewer = ({ pdfUrl = null, onError = null }) => {
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [renderedPages, setRenderedPages] = useState([]);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const pdfContainerRef = useRef(null);
  const pagesPerBatch = 10;
  const minZoom = 0.5;
  const maxZoom = 3.0;
  const zoomStep = 0.25;

  // Load PDF.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Load PDF from URL when pdfUrl prop changes
  useEffect(() => {
    if (pdfUrl) {
      loadPdfFromUrl(pdfUrl);
    }
  }, [pdfUrl]);

  // Re-render pages when zoom level changes
  useEffect(() => {
    if (pdfDocument && renderedPages.length > 0 && !isLoading) {
      loadBatch(pdfDocument, currentBatch);
    }
  }, [zoomLevel, pdfDocument, currentBatch]);

  const loadPdfFromUrl = async (url) => {
    try {
      setIsLoading(true);
      setError("");
      setRenderedPages([]);

      // Fetch the blob from the URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      // Get array buffer from response
      const arrayBuffer = await response.arrayBuffer();
      
      // Load PDF document
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDocument(pdf);
      setTotalPages(pdf.numPages);
      setCurrentBatch(0);

      await loadBatch(pdf, 0);
    } catch (err) {
      const errorMessage = "Error loading PDF: " + err.message;
      setError(errorMessage);
      if (onError) {
        onError(err);
      }
      console.error("PDF loading error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBatch = async (pdfDoc, batchIndex) => {
    if (!pdfDoc) return;

    setIsLoading(true);
    setRenderedPages([]); // Clear previous pages

    const startPage = batchIndex * pagesPerBatch + 1;
    const endPage = Math.min(startPage + pagesPerBatch - 1, pdfDoc.numPages);

    try {
      const pages = [];
      for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const pageData = await renderPage(pdfDoc, pageNum);
        pages.push(pageData);
      }
      setRenderedPages(pages);
    } catch (err) {
      setError("Error rendering pages: " + err.message);
      console.error("Page rendering error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPage = async (pdfDoc, pageNum) => {
    const page = await pdfDoc.getPage(pageNum);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Calculate scale for mobile optimization with zoom
    const containerWidth = pdfContainerRef.current
      ? pdfContainerRef.current.clientWidth - 32
      : 350;
    const viewport = page.getViewport({ scale: 1 });
    const baseScale = Math.min(containerWidth / viewport.width, 2.5);
    const scale = baseScale * zoomLevel;

    const scaledViewport = page.getViewport({ scale });

    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
    };

    await page.render(renderContext).promise;

    return {
      pageNum,
      canvas: canvas.toDataURL(),
      width: canvas.width,
      height: canvas.height,
    };
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(maxZoom, Math.round((zoomLevel + zoomStep) * 100) / 100);
    setZoomLevel(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(minZoom, Math.round((zoomLevel - zoomStep) * 100) / 100);
    setZoomLevel(newZoom);
  };

  const handleZoomReset = () => {
    setZoomLevel(1.0);
  };

  const handlePrevious = () => {
    if (currentBatch > 0 && !isLoading && pdfDocument) {
      const newBatch = currentBatch - 1;
      setCurrentBatch(newBatch);
      loadBatch(pdfDocument, newBatch);
      scrollToTop();
    }
  };

  const handleNext = () => {
    const maxBatch = Math.ceil(totalPages / pagesPerBatch) - 1;
    if (currentBatch < maxBatch && !isLoading && pdfDocument) {
      const newBatch = currentBatch + 1;
      setCurrentBatch(newBatch);
      loadBatch(pdfDocument, newBatch);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (pdfContainerRef.current) {
      pdfContainerRef.current.scrollTop = 0;
    }
  };

  const getPaginationInfo = () => {
    const startPage = currentBatch * pagesPerBatch + 1;
    const endPage = Math.min(startPage + pagesPerBatch - 1, totalPages);
    const maxBatch = Math.ceil(totalPages / pagesPerBatch) - 1;
    const currentBatchNum = currentBatch + 1;
    const totalBatches = maxBatch + 1;

    return {
      startPage,
      endPage,
      currentBatchNum,
      totalBatches,
      isFirstBatch: currentBatch === 0,
      isLastBatch: currentBatch === maxBatch,
      prevStart: Math.max(1, startPage - pagesPerBatch),
      prevEnd: startPage - 1,
      nextStart: endPage + 1,
      nextEnd: Math.min(totalPages, endPage + pagesPerBatch),
    };
  };

  const paginationInfo = getPaginationInfo();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Zoom Controls Header */}
      <div
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          flex: 1 
        }}>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= minZoom}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "6px",
              padding: "10px 14px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: zoomLevel <= minZoom ? "not-allowed" : "pointer",
              opacity: zoomLevel <= minZoom ? 0.5 : 1,
              transition: "all 0.2s",
              minWidth: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>

          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "10px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            minWidth: "80px",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            {Math.round(zoomLevel * 100)}%
          </div>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= maxZoom}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "6px",
              padding: "10px 14px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: zoomLevel >= maxZoom ? "not-allowed" : "pointer",
              opacity: zoomLevel >= maxZoom ? 0.5 : 1,
              transition: "all 0.2s",
              minWidth: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>

        <button
          onClick={handleZoomReset}
          disabled={zoomLevel === 1.0}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: zoomLevel === 1.0 ? "not-allowed" : "pointer",
            opacity: zoomLevel === 1.0 ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          Reset
        </button>
      </div>

      {/* Info */}
      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280",
          padding: "8px",
        }}
      >
        {totalPages > 0
          ? `PDF loaded: ${totalPages} pages total`
          : pdfUrl 
            ? "Loading PDF from URL..."
            : "Select a PDF file to start viewing"}
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            color: "#ef4444",
            padding: "16px",
            margin: "16px",
            borderRadius: "8px",
            border: "1px solid #fca5a5",
          }}
        >
          {error}
        </div>
      )}

      {/* PDF Container */}
      <div
        ref={pdfContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: zoomLevel > 1.0 ? "auto" : "hidden",
          padding: zoomLevel > 1.0 ? "16px 0" : "16px",
          backgroundColor: "#f3f4f6",
        }}
      >
        {/* Loading Indicator */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "32px" }}>
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "3px solid #e5e7eb",
                borderTop: "3px solid #007bff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "16px",
              }}
            ></div>
            <div style={{ color: "#6b7280" }}>
              {pdfUrl ? "Loading PDF from URL..." : "Loading PDF pages..."}
            </div>
          </div>
        )}

        {/* Rendered Pages */}
        {!isLoading &&
          renderedPages.map((page, index) => (
            <div
              key={`${currentBatch}-${page.pageNum}`}
              style={{
                marginBottom: zoomLevel > 1.0 ? `${24 * zoomLevel}px` : "24px",
                marginLeft: "16px",
                marginRight: "16px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${index * 100}ms forwards`,
                overflow: "visible",
                transform: zoomLevel !== 1.0 ? `scale(${zoomLevel})` : 'none',
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-out',
                width: zoomLevel > 1.0 ? `${100 * zoomLevel}%` : "auto",
              }}
            >
              <div
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                Page {page.pageNum} of {totalPages}
              </div>
              <img
                src={page.canvas}
                alt={`Page ${page.pageNum}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                }}
              />
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "white",
            borderTop: "1px solid #e5e7eb",
            position: "sticky",
            bottom: 0,
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={paginationInfo.isFirstBatch || isLoading}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 16px",
              borderRadius: "8px",
              fontWeight: "500",
              transition: "all 0.2s",
              cursor:
                paginationInfo.isFirstBatch || isLoading
                  ? "not-allowed"
                  : "pointer",
              opacity: paginationInfo.isFirstBatch || isLoading ? 0.5 : 1,
              border: "none",
            }}
          >
            {paginationInfo.isFirstBatch
              ? "← First Batch"
              : `← Pages ${paginationInfo.prevStart}-${paginationInfo.prevEnd}`}
          </button>

          <div
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "#4b5563",
              flex: 1,
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <div style={{ fontSize: "14px" }}>
              Batch {paginationInfo.currentBatchNum} of{" "}
              {paginationInfo.totalBatches}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              Pages {paginationInfo.startPage}-{paginationInfo.endPage}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={paginationInfo.isLastBatch || isLoading}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 16px",
              borderRadius: "8px",
              fontWeight: "500",
              transition: "all 0.2s",
              cursor:
                paginationInfo.isLastBatch || isLoading
                  ? "not-allowed"
                  : "pointer",
              opacity: paginationInfo.isLastBatch || isLoading ? 0.5 : 1,
              border: "none",
            }}
          >
            {paginationInfo.isLastBatch
              ? "Last Batch →"
              : `Pages ${paginationInfo.nextStart}-${paginationInfo.nextEnd} →`}
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobilePdfViewer;