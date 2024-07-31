import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Puzzle.css";

const PUZZLE_WIDTH = 500;

const Puzzle = ({ image, rows, cols }) => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);

  let img = document.createElement("img");
  img.src = image;

  useEffect(() => {
    const tileWidth = (Math.floor(100 / cols) * img.naturalWidth) / 100;
    const tileHeight = (Math.floor(100 / rows) * img.naturalHeight) / 100;

    const newTiles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newTiles.push({
          id: `${row}-${col}`,
          style: {
            width: `${tileWidth}px`,
            height: `${tileHeight}px`,
            backgroundImage: `url(${image})`,
            backgroundPosition: `${col * tileWidth}px ${row * tileHeight}px`,
          },
          order: row * cols + col,
        });
      }
    }
    setTiles(shuffle(newTiles));
  }, [image, rows, cols]);

  console.log(" newTiles: ", tiles);

  const shuffle = (array) => {
    // Fisher-Yates shuffle algorithm (simplified)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkSolved = () => {
    return tiles.every((tile, index) => tile.order === index);
  };

  const handleTileClick = (clickedTile) => {
    // ... (Logic to swap tiles based on user interaction)
    // Check if the puzzle is solved after each move
  };

  return (
    <div className="puzzle-container">
      {solved ? (
        <div>Congratulations! Puzzle Solved!</div>
      ) : (
        <div className="puzzle">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="tile"
              onClick={() => handleTileClick(tile)}
              style={{ ...tile.style, aspectRatio: `${cols} / ${rows}` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Puzzle;
