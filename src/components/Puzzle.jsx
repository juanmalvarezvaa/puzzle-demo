import React, { useState, useEffect, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import "./Puzzle.css";

const PUZZLE_WIDTH = 500;

const Puzzle = ({ image, rows, cols }) => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);
  // const [pickedTile, setPickedTile] = useState();
  // const [droppedTile, setDroppedTile] = useState();
  // const constraintsRef = useRef(null);
  const [items, setItems] = useState();

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
    const shuffledTiles = shuffle(newTiles);
    setTiles(shuffledTiles);
    setItems(shuffledTiles);
  }, [image, rows, cols]);

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

  // const handleTileClick = (clickedTile) => {
  //   console.log("clickedTile", clickedTile);
  //   // ... (Logic to swap tiles based on user interaction)
  //   // Check if the puzzle is solved after each move
  // };

  // const handleTileMouseUp = (clickedTile) => {
  //   console.log("handleTileMouseUp", clickedTile);
  //   // ... (Logic to swap tiles based on user interaction)
  //   // Check if the puzzle is solved after each move
  // };

  const calculateTile = (x, y) => {};

  // const handleOnDragStart = (event, info, tile) => {
  //   console.log("start: ", info.point.x, info.point.y, tile);
  //   setPickedTile(tile.id);
  // };

  // const handleOnDragEnd = (event, info, tile) => {
  //   console.log("end: ", info.point.x, info.point.y, tile);
  //   calculateTile;
  // };

  console.log(" tiles: ", tiles);

  return (
    <div className="puzzle-container">
      {solved ? (
        <div>Congratulations! Puzzle Solved!</div>
      ) : (
        // <motion.div className="puzzle" ref={constraintsRef}>
        //   {tiles.map((tile) => (
        //     <motion.div
        //       drag
        //       dragConstraints={constraintsRef}
        //       dragElastic={0.1}
        //       dragMomentum={false}
        //       onDragStart={(event, info) =>
        //         handleOnDragStart(event, info, tile)
        //       }
        //       onDragEnd={(event, info) => handleOnDragEnd(event, info, tile)}
        //       // onMouseUp={() => handleTileMouseUp(tile)}
        //       key={tile.id}
        //       className="tile"

        //       // onMouseDown={() => handleTileClick(tile)}
        //       style={{ ...tile.style, aspectRatio: `${cols} / ${rows}` }}
        //     />
        //   ))}
        // </motion.div>
        <Reorder.Group axis="y" values={tiles} onReorder={setItems}>
          {tiles.map((tile) => (
            <Reorder.Item key={tile.id} value={tile}>
              <div
                key={tile.id}
                className="tile"
                onClick={() => handleTileClick(tile)}
                style={{ ...tile.style, aspectRatio: `${cols} / ${rows}` }}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default Puzzle;
