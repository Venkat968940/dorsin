/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnhancedStyle, PDFPage } from "../../styles/globalStyles";
import FileContext from "../../utils/FileContext";
import { PdfErrorComponent, PdfLoader } from "./PdfLoader";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import MobilePdfViewer from "./MobilePdfViewer";
import { Lens, RestartAlt, ZoomIn, ZoomOut } from "@mui/icons-material";

const PDFViewer = () => {
  const { file } = useContext(FileContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [renderedPages, setRenderedPages] = useState(new Set());
  const [canvasRefs, setCanvasRefs] = useState([]);
  const [thumbnailRefs, setThumbnailRefs] = useState([]);
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Mobile-specific states
  const [isMobile, setIsMobile] = useState(false);
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // 0-based index for page groups
  const [pagesPerGroup] = useState(10); // Number of pages to load per group on mobile
  const [mobileRenderedPages, setMobileRenderedPages] = useState(new Set()); // Track which pages are rendered on mobile

  // A4 dimensions in pixels at 96 DPI (standard web DPI)
  const A4_WIDTH = 794; // 210mm at 96 DPI
  const A4_HEIGHT = 1123; // 297mm at 96 DPI

  // Thumbnail dimensions
  const THUMBNAIL_WIDTH = 120;
  const THUMBNAIL_HEIGHT = 169; // Maintain A4 aspect ratio

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide thumbnails on mobile
  useEffect(() => {
    if (isMobile) {
      setShowThumbnails(false);
    }
  }, [isMobile]);
  // Render functions defined first
  const renderPage = async (pdf, pageNum, canvasRef) => {
    try {
      if (!canvasRef?.current) {
        return;
      }

      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to fixed A4 dimensions scaled by our scale factor
      const canvasWidth = A4_WIDTH * scale;
      const canvasHeight = A4_HEIGHT * scale;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Clear canvas with white background
      context.fillStyle = "white";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      // Get the page viewport to determine how to fit it within A4 dimensions
      const viewport = page.getViewport({ scale: 1 });

      // Calculate scale to fit the page within A4 dimensions while maintaining aspect ratio
      const scaleX = (A4_WIDTH * scale) / viewport.width;
      const scaleY = (A4_HEIGHT * scale) / viewport.height;
      const pageScale = Math.min(scaleX, scaleY);

      const scaledViewport = page.getViewport({ scale: pageScale });

      // Center the PDF page on the A4 canvas
      const offsetX = (canvasWidth - scaledViewport.width) / 2;
      const offsetY = (canvasHeight - scaledViewport.height) / 2;

      context.save();
      context.translate(offsetX, offsetY);

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
      context.restore();

      // Add page border
      context.strokeStyle = "#ddd";
      context.lineWidth = 1;
      context.strokeRect(0, 0, canvasWidth, canvasHeight);
    } catch (err) {
      throw err;
    }
  };

  const renderThumbnail = async (pdf, pageNum, thumbnailRef) => {
    try {
      if (!thumbnailRef?.current) {
        return;
      }

      const page = await pdf.getPage(pageNum);
      const canvas = thumbnailRef.current;
      const context = canvas.getContext("2d");

      // Set thumbnail canvas size
      canvas.width = THUMBNAIL_WIDTH;
      canvas.height = THUMBNAIL_HEIGHT;

      // Clear canvas with white background
      context.fillStyle = "white";
      context.fillRect(0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);

      // Get the page viewport
      const viewport = page.getViewport({ scale: 1 });

      // Calculate scale to fit the page within thumbnail dimensions
      const scaleX = THUMBNAIL_WIDTH / viewport.width;
      const scaleY = THUMBNAIL_HEIGHT / viewport.height;
      const thumbnailScale = Math.min(scaleX, scaleY);

      const scaledViewport = page.getViewport({ scale: thumbnailScale });

      // Center the PDF page on the thumbnail canvas
      const offsetX = (THUMBNAIL_WIDTH - scaledViewport.width) / 2;
      const offsetY = (THUMBNAIL_HEIGHT - scaledViewport.height) / 2;

      context.save();
      context.translate(offsetX, offsetY);

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
      context.restore();

      // Add thumbnail border
      context.strokeStyle = "#ddd";
      context.lineWidth = 1;
      context.strokeRect(0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    } catch (err) {
      // Ignore thumbnail render errors
    }
  };

  useEffect(() => {
    if (!file) navigate("/");

    const loadPDFJS = () => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.async = true;
        script.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            resolve(window.pdfjsLib);
          } else {
            reject(new Error("PDF.js failed to load"));
          }
        };
        script.onerror = () =>
          reject(new Error("Failed to load PDF.js script"));
        document.head.appendChild(script);
      });
    };

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        const pdfjsLib = await loadPDFJS();
        const loadingTask = pdfjsLib.getDocument(file);
        const pdf = await loadingTask.promise;

        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        setPageInput("1");

        // Initialize canvas refs array for main pages
        const refs = Array.from({ length: pdf.numPages }, () =>
          React.createRef()
        );
        setCanvasRefs(refs);

        // Initialize thumbnail refs array
        const thumbRefs = Array.from({ length: pdf.numPages }, () =>
          React.createRef()
        );
        setThumbnailRefs(thumbRefs);

        // Render all pages and thumbnails
        setTimeout(async () => {
          try {
            if (isMobile) {
              // On mobile, render only the first group of pages
              await renderMobilePageGroup(pdf, refs, 0);
            } else {
              // On desktop, render all pages as before
              await Promise.all([
                renderAllPages(pdf, refs),
                renderAllThumbnails(pdf, thumbRefs),
              ]);
            }
            setLoading(false);
          } catch (err) {
            setError("Failed to render PDF pages");
            setLoading(false);
          }
        }, 100);
      } catch (err) {
        setError(`Failed to load PDF: ${err.message}`);
        setLoading(false);
      }
    };

    loadPDF();
  }, [file, isMobile]);

  // Mobile-specific function to render a group of pages
  const renderMobilePageGroup = async (pdf, refs, groupIndex) => {
    const startPage = groupIndex * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, pdf.numPages);
    const renderPromises = [];

    // Clear canvases for pages not in the current group
    for (let i = 0; i < refs.length; i++) {
      if (i + 1 < startPage || i + 1 > endPage) {
        const ref = refs[i];
        if (ref?.current) {
          const ctx = ref.current.getContext("2d");
          ctx && ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        }
      }
    }

    // Render pages in the current group
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      renderPromises.push(renderPage(pdf, pageNum, refs[pageNum - 1]));
    }

    try {
      await Promise.all(renderPromises);

      // Mark the rendered pages
      const newRenderedPages = new Set();
      for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        newRenderedPages.add(pageNum);
      }
      setMobileRenderedPages(newRenderedPages); // Update the state with the new set of rendered pages
    } catch (err) {
      setError("Failed to render PDF pages.");
    }
  };

  const renderAllPages = async (pdf, refs) => {
    const renderPromises = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      renderPromises.push(renderPage(pdf, pageNum, refs[pageNum - 1]));
    }

    try {
      await Promise.all(renderPromises);
      setRenderedPages(
        new Set(Array.from({ length: pdf.numPages }, (_, i) => i + 1))
      );
    } catch (err) {
      setError("Failed to render PDF pages.");
    }
  };

  const renderAllThumbnails = async (pdf, thumbRefs) => {
    const renderPromises = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      renderPromises.push(
        renderThumbnail(pdf, pageNum, thumbRefs[pageNum - 1])
      );
    }

    try {
      await Promise.all(renderPromises);
    } catch (err) {
      // Ignore thumbnail errors
    }
  };
  // Function to load next page group on mobile
  const loadNextPageGroup = async () => {
    if (!pdfDoc || !isMobile) return;

    const nextGroupIndex = currentPageGroup + 1;
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);

    if (nextGroupIndex < totalGroups) {
      setLoading(true);
      setCurrentPageGroup(nextGroupIndex);
      try {
        await renderMobilePageGroup(pdfDoc, canvasRefs, nextGroupIndex);
      } catch (err) {
        // Handle error silently
      }
      setLoading(false);
    }
  };

  const loadPrevPageGroup = async () => {
    if (!pdfDoc || !isMobile) return;

    const prevGroupIndex = currentPageGroup - 1;

    if (prevGroupIndex >= 0) {
      setLoading(true);
      setCurrentPageGroup(prevGroupIndex);
      try {
        await renderMobilePageGroup(pdfDoc, canvasRefs, prevGroupIndex);
      } catch (err) {
        // Handle error silently
      }
      setLoading(false);
    }
  };

  // Get the pages to display based on mobile/desktop mode
  const getPagesToDisplay = () => {
    if (!isMobile) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // Only show the current group of 10 pages on mobile
    const startPage = currentPageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleScaleChange = async (newScale) => {
    const clampedScale = Math.max(0.5, Math.min(2, newScale));
    setScale(clampedScale);
    // if (pdfDoc && canvasRefs.length > 0) {
    // setLoading(true);
    // await renderAllPages(pdfDoc, canvasRefs);
    // setLoading(false);
    // }
  };

  const scrollToPage = (pageNum) => {
    if (canvasRefs[pageNum - 1]?.current) {
      const canvas = canvasRefs[pageNum - 1].current;
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const { scrollTop } = container;
        const targetScrollTop =
          scrollTop + (canvasRect.top - containerRect.top);

        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
      setCurrentPage(pageNum);
      setPageInput(pageNum.toString());
    }
  };

  const scrollThumbnailToCurrentPage = (pageNum) => {
    if (thumbnailRefs[pageNum - 1]?.current && thumbnailContainerRef.current) {
      const thumbnail = thumbnailRefs[pageNum - 1].current.parentElement;
      const container = thumbnailContainerRef.current;

      if (thumbnail) {
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        const { scrollTop } = container;
        const targetScrollTop =
          scrollTop +
          (thumbnailRect.top - containerRect.top) -
          container.clientHeight / 2 +
          thumbnail.clientHeight / 2;

        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: "smooth",
        });
      }
    }
  };

  const handleThumbnailClick = (pageNum) => {
    scrollToPage(pageNum);
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      scrollToPage(pageNum);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      scrollToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      scrollToPage(currentPage - 1);
    }
  };

  const firstPage = () => scrollToPage(1);
  const lastPage = () => scrollToPage(totalPages);

  const zoomIn = () => handleScaleChange(scale + 0.2);
  const zoomOut = () => handleScaleChange(scale - 0.2);
  const resetZoom = () => handleScaleChange(1);

  // Handle scroll to update current page
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || canvasRefs.length === 0) return;

      const container = containerRef.current;
      const { scrollTop } = container;
      const containerHeight = container.clientHeight;
      const viewportCenter = scrollTop + containerHeight / 2;

      // Find which page is most visible
      for (let i = 0; i < canvasRefs.length; i++) {
        const canvasElement = canvasRefs[i]?.current;
        if (canvasElement) {
          const rect = canvasElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const elementTop = rect.top - containerRect.top + scrollTop;
          const elementBottom = elementTop + rect.height;

          // Check if viewport center is within this page
          if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
            const newPage = i + 1;
            if (currentPage !== newPage) {
              setCurrentPage(newPage);
              setPageInput(newPage.toString());
              // Scroll thumbnail to current page
              scrollThumbnailToCurrentPage(newPage);
            }
            break;
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      // Initial call to set correct page
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [canvasRefs, currentPage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT") return;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prevPage();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextPage();
          break;
        case "Home":
          e.preventDefault();
          firstPage();
          break;
        case "End":
          e.preventDefault();
          lastPage();
          break;
        case "=":
        case "+":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomIn();
          }
          break;
        case "-":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomOut();
          }
          break;
        case "0":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetZoom();
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, scale]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Check if the screen width is less than or equal to 768px
      setScale(window.innerWidth / A4_WIDTH); // Adjust scale for mobile devices
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!file) {
    return (
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 384,
          backgroundColor: "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography color="#6b7280" fontSize={18} mb={1}>
            📄 No PDF file provided
          </Typography>
          <Typography color="#9ca3af" fontSize={14}>
            Please select a PDF file to view
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Box sx={PDFPage}>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        {/* Enhanced Controls */}
        <Box sx={EnhancedStyle}>
          {/* Navigation Controls */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
            flexWrap="wrap"
          >
            {/* Mobile Page Group Navigation */}
            {isMobile && (
              <>
                <Button
                  onClick={loadPrevPageGroup}
                  disabled={currentPageGroup <= 0 || loading}
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 100 }}
                >
                  ⏮️ Prev 10
                </Button>
                <Typography fontSize={14} color="text.secondary">
                  Pages {currentPageGroup * pagesPerGroup + 1} -{" "}
                  {Math.min((currentPageGroup + 1) * pagesPerGroup, totalPages)}{" "}
                  of {totalPages}
                </Typography>
                <Button
                  onClick={loadNextPageGroup}
                  disabled={
                    currentPageGroup >=
                      Math.ceil(totalPages / pagesPerGroup) - 1 || loading
                  }
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 100 }}
                >
                  Next 10 ⏭️
                </Button>
              </>
            )}

            {/* Desktop Navigation Controls */}
            {!isMobile && (
              <>
                <Button
                  onClick={firstPage}
                  disabled={currentPage <= 1 || loading}
                  variant="contained"
                  color="primary"
                >
                  ⏮️ First
                </Button>
                <Button
                  onClick={prevPage}
                  disabled={currentPage <= 1 || loading}
                  variant="contained"
                  color="primary"
                >
                  ← Previous
                </Button>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontSize={14} color="text.secondary">
                    Page
                  </Typography>
                  <TextField
                    value={pageInput}
                    onChange={handlePageInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handlePageInputSubmit(e);
                    }}
                    disabled={loading}
                    size="small"
                    sx={{ width: 60 }}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                  <Typography fontSize={14} color="text.secondary">
                    of {totalPages}
                  </Typography>
                </Stack>
                <Button
                  onClick={nextPage}
                  disabled={currentPage >= totalPages || loading}
                  variant="contained"
                  color="primary"
                >
                  Next →
                </Button>
                <Button
                  onClick={lastPage}
                  disabled={currentPage >= totalPages || loading}
                  variant="contained"
                  color="primary"
                >
                  Last ⏭️
                </Button>
              </>
            )}
          </Stack>
          {/* Zoom Controls */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={zoomOut} disabled={scale <= 0.5 || loading}>
              <ZoomOut />
            </IconButton>

            <Typography
              fontSize={14}
              color="text.secondary"
              fontWeight={500}
              minWidth={60}
              textAlign="center"
            >
              {Math.round(scale * 100)}%
            </Typography>
            <IconButton onClick={zoomIn} disabled={scale >= 2 || loading}>
              <ZoomIn />
            </IconButton>
            <IconButton onClick={resetZoom} disabled={loading}>
              <RestartAlt />
            </IconButton>
          </Stack>
          {/* Thumbnail Toggle - Hidden on mobile */}
          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                onClick={() => setShowThumbnails(!showThumbnails)}
                variant="contained"
                color={showThumbnails ? "success" : "inherit"}
              >
                📑 {showThumbnails ? "Hide" : "Show"} Thumbnails
              </Button>
            </Stack>
          )}
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* PDF Canvas Container */}
          <Box
            ref={containerRef}
            sx={{
              flex: 1,
              overflow: "auto",
              backgroundColor: "#e5e7eb",
              p: 3,
            }}
          >
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            )}

            {error && <PdfErrorComponent error={error} />}

            {!loading && !error && (
              <Stack alignItems="center" spacing={3}>
                {getPagesToDisplay().map((pageNum) => (
                  <Paper
                    key={pageNum}
                    elevation={3}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      p: 1,
                      position: "relative",
                      width: {
                        xs: "85vw",
                        sm: "85vw",
                        md: `${A4_WIDTH * scale + 16}px`,
                      },
                      maxWidth: `${A4_WIDTH * scale + 16}px`,
                      height: `${A4_HEIGHT * scale + 40}px`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <canvas
                      ref={canvasRefs[pageNum - 1]}
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        display: "block",
                        width: `${A4_WIDTH * scale}px`,
                        height: `${A4_HEIGHT * scale}px`,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        px: 1,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {pageNum}
                    </Box>
                    <Typography
                      textAlign="center"
                      mt={1.5}
                      fontSize={14}
                      color="text.secondary"
                    >
                      Page {pageNum} of {totalPages}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
          {/* Thumbnail Sidebar - Hidden on mobile */}
          {showThumbnails && !isMobile && (
            <Box
              sx={{
                width: 180,
                backgroundColor: "#f9fafb",
                borderRight: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#374151",
                  textAlign: "center",
                }}
              >
                Page Thumbnails
              </Box>
              <Box
                ref={thumbnailContainerRef}
                sx={{ flex: 1, overflow: "auto", p: 1 }}
              >
                {!loading &&
                  !error &&
                  thumbnailRefs.map((thumbnailRef, index) => (
                    <Paper
                      key={index}
                      onClick={() => handleThumbnailClick(index + 1)}
                      elevation={currentPage === index + 1 ? 4 : 1}
                      sx={{
                        mb: 2,
                        cursor: "pointer",
                        p: 1,
                        borderRadius: 1.5,
                        border:
                          currentPage === index + 1
                            ? "3px solid #3b82f6"
                            : "1px solid #e5e7eb",
                        backgroundColor:
                          currentPage === index + 1 ? "#eff6ff" : "#fff",
                        boxShadow: currentPage === index + 1 ? 3 : 1,
                        position: "relative",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform:
                            currentPage !== index + 1
                              ? "scale(1.02)"
                              : undefined,
                          boxShadow: 3,
                        },
                      }}
                    >
                      <canvas
                        ref={thumbnailRef}
                        style={{
                          width: `${THUMBNAIL_WIDTH}px`,
                          height: `${THUMBNAIL_HEIGHT}px`,
                          display: "block",
                          borderRadius: "4px",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor:
                            currentPage === index + 1
                              ? "#3b82f6"
                              : "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          px: 1,
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Paper>
                  ))}
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 200,
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>

        {/* Keyboard Shortcuts Help */}
        <Box
          sx={{
            px: 2,
            py: 1,
            backgroundColor: "#f3f4f6",
            borderTop: "1px solid #e5e7eb",
            fontSize: 12,
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          <span>
            Keyboard shortcuts: ← → (navigate) | Home/End (first/last page) |
            Scroll to view all pages | Click thumbnails to jump to page
          </span>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobilePdfViewer
          pdfUrl={file}
          onError={(error) => console.error("PDF Error:", error)}
        />
      </Box>
    </Box>
  );
};

export default PDFViewer;
