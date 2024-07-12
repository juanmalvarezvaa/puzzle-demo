import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      <header className="image-header">
        {!image && <label htmlFor="imageInput">Please upload an image.</label>}
        <input
          type="file"
          id="imageInput"
          name="imageInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img
            src={image}
            alt="Loaded image"
            style={{ heigh: "64px", width: "64px" }}
          />
        )}
      </header>
    </>
  );
}

export default App;
