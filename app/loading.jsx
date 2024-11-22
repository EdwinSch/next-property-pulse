"use client";
import ClipLoader from "react-spinners/ClipLoader";

const styleOverride = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={styleOverride}
      size={120}
      aria-label="loading spinner"
    />
  );
};
export default LoadingPage;
