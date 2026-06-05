import React from "react";
import { createRoot } from "react-dom/client";
import PoetryGallery from "./PoetryGallery";
import Game from "./Game.jsx";
import Bday from "./Bday.jsx";

const poetryContainer = document.getElementById("poetry-root");

if (poetryContainer) {
  createRoot(poetryContainer).render(<PoetryGallery />);
}

const gameContainer = document.getElementById("game-root");

if (gameContainer) {
  createRoot(gameContainer).render(<Game />);
}

const bdayContainer = document.getElementById("bday-root");

if (bdayContainer) {
  createRoot(bdayContainer).render(<Bday />);
}
