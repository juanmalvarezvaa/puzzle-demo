import { useState } from "react";
import "./App.css";
import Puzzle from "./components/Puzzle";

const App = () => {
  const [rows, setRows] = useState(1);
  const [imageData, setImageData] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleRowChange = (event) => {
    setRows(event.target.value);
  };

  const handleLoadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          setImageData({
            source: e.target.result,
            size: { width: img.width, height: img.height },
          });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRandomImage = () => {
    setIsLoadingImage(true);
    const url = "https://picsum.photos/720";
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setIsLoadingImage(false);
      setImageData({
        source: url,
        size: { width: img.width, height: img.height },
      });
    };
    img.onerror = () => {
      setIsLoadingImage(false);
      console.error("Error loading image");
    };
  };

  return (
    <>
      <header className="image-header">
        {!imageData && (
          <>
            <label htmlFor="imageInput">
              Please upload an image or click{" "}
              <button onClick={handleRandomImage} disabled={isLoadingImage}>
                {isLoadingImage ? "Loading..." : "HERE"}
              </button>{" "}
              for a random image.
            </label>

            <input
              type="file"
              id="imageInput"
              name="imageInput"
              accept="image/*"
              onChange={handleLoadImage}
            />
          </>
        )}
        {imageData && (
          <>
            {/* <img
              src={image}
              alt="Loaded image"
              style={{ heigh: "64px", width: "64px" }}
            /> */}
            <div className="rows-input">
              <label htmlFor="rows">Desired row/cols:</label>
              <input
                type="number"
                name="rows"
                id="rows"
                max="10"
                min="2"
                onChange={handleRowChange}
                style={{ width: "20px", appearance: "textfield" }}
              />
            </div>
          </>
        )}
      </header>
      {rows > 1 && imageData && (
        <Puzzle
          image={imageData}
          rows={rows}
          onRestart={() => {
            setImageData(null);
            setRows(1);
          }}
        />
      )}
    </>
  );
};

export default App;
