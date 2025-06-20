import React from "react";

export const PdfLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "2px solid #e5e7eb",
            borderTop: "2px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <p
          style={{
            color: "#4b5563",
            margin: 0,
          }}
        >
          Loading PDF...
        </p>
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            marginTop: "8px",
          }}
        >
          Please wait while we prepare your document
        </p>
      </div>
    </div>
  ); 
};

export const PdfErrorComponent = ({error}) =>{
    return(
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "32px",
                  backgroundColor: "#fef2f2",
                  border: "2px solid #fecaca",
                  borderRadius: "8px",
                  maxWidth: "384px",
                }}
              >
                <p
                  style={{
                    color: "#dc2626",
                    marginBottom: "8px",
                    fontSize: "20px",
                  }}
                >
                  ⚠️ Error
                </p>
                <p
                  style={{
                    color: "#7f1d1d",
                    marginBottom: "16px",
                  }}
                >
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#dc2626";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#ef4444";
                  }}
                >
                  Reload Page
                </button>
              </div>
            </div>
    )
}


