import React from "react";
import { createRoot } from "react-dom/client";
import PoetryGallery from "./PoetryGallery";

const container = document.getElementById("poetry-root");

if (container) {
  createRoot(container).render(<PoetryGallery />);
}