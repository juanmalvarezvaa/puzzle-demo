import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, Reorder } from "framer-motion";
import "./Puzzle.css";

const Puzzle = ({ image, rows, onRestart }) => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);
  const { source, size } = image;

  useEffect(() => {
    if (solved) return;

    const maxWidth = 1280;
    const aspectRatio = size.width / size.height;
    const finalWidth = size.width > maxWidth ? maxWidth : size.width;
    const finalHeight = finalWidth / aspectRatio;
    const tileHeight = finalHeight / rows;

    const newTiles = [];
    for (let row = 0; row < rows; row++) {
      newTiles.push({
        id: row,
        style: {
          width: `${finalWidth}px`,
          height: `${tileHeight}px`,
          backgroundImage: `url(${source})`,
          backgroundSize: `${finalWidth}px ${finalHeight}px`,
          backgroundPosition: `0px -${row * tileHeight}px`,
          backgroundRepeat: 'no-repeat',
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
    if (checkSolved(array)) shuffle(array); // In case the shuffle went wrong
    return array;
  };

  const checkSolved = (tilesOrdered) => {
    return tilesOrdered.every((tile, index) => tile.id === index);
  };

  const handleReOrder = (event) => {
    setTiles(event);
  };

  const handleRestart = () => {
    // setTiles(shuffle(tiles));
    setSolved(false);
    onRestart();
  };

  const handleItemDrop = () => {
    setSolved(checkSolved(tiles));
  };

  return (
    <div className="puzzle-container">
      {solved &&
        createPortal(
          <>
            <motion.div className="win-dialog-container">
              <motion.dialog
                open={solved}
                className="win-dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              >
                <div className="dialog-content">
                  <div class="win-title">Congratulations! Puzzle Solved!</div>
                  <button onClick={handleRestart}>Restart</button>
                </div>
              </motion.dialog>
            </motion.div>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </>,
          document.body
        )}

      <Reorder.Group
        axis="y"
        values={tiles}
        onReorder={(event) => {
          handleReOrder(event);
        }}
        onMouseUp={handleItemDrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        {tiles.map((tile) => (
          <Reorder.Item key={tile.id} value={tile}>
            <motion.div
              key={tile.id}
              whileHover={{
                scale: 1.02,
                boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
              }}
              style={{
                ...tile.style,
                aspectRatio: 1,
                opacity: 1,
                cursor: "grab",
              }}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Puzzle;
