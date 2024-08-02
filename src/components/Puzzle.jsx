import React, { useState, useEffect, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import "./Puzzle.css";

// const PUZZLE_WIDTH = 500;

const Puzzle = ({ image, rows }) => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);

  let img = document.createElement("img");
  img.src = image;

  useEffect(() => {
    const tileHeight = (Math.floor(100 / rows) * img.naturalHeight) / 100;

    const newTiles = [];
    for (let row = 0; row < rows; row++) {
      newTiles.push({
        id: row,
        style: {
          width: `${img.naturalWidth}px`,
          height: `${tileHeight}px`,
          backgroundImage: `url(${image})`,
          backgroundPosition: `0px -${row * tileHeight}px`,
        },
      });
    }
    setTiles(shuffle(newTiles));
  }, [image, rows]);

  const shuffle = (array) => {
    // Fisher-Yates shuffle algorithm (simplified)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkSolved = (tilesOrdered) => {
    return tilesOrdered.every((tile, index) => tile.id === index);
  };

  const handleReOrder = (event) => {
    setTiles(event);
    setSolved(checkSolved(event));
  };

  const handleRestart = () => {
    setTiles(shuffle(tiles));
    setSolved(false);
  };

  return (
    <div className="puzzle-container">
      {solved ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div>Congratulations! Puzzle Solved!</div>
          <button onClick={handleRestart}>Restart</button>
        </motion.div>
      ) : (
        <Reorder.Group
          axis="y"
          values={tiles}
          onReorder={(event) => {
            handleReOrder(event);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          {tiles.map((tile) => (
            <Reorder.Item key={tile.id} value={tile}>
              <motion.div
                key={tile.id}
                className="tile"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
                }}
                style={{ ...tile.style, aspectRatio: 1 }}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Puzzle;
