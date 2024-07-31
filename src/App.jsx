import { useState } from "react";
import "./App.css";
import Puzzle from "./components/Puzzle";

function App() {
  const [image, setImage] = useState(null);
  const [rows, setRows] = useState(1);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleRowChange = (event) => {
    setRows(event.target.value);
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
          <>
            <img
              src={image}
              alt="Loaded image"
              style={{ heigh: "64px", width: "64px" }}
            />
            <div className="rows-input">
              <label htmlFor="imageInput">Desired row/cols:</label>
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
      {/* <Puzzle image={"https://picsum.photos/480"} rows={2} cols={2} /> */}
      <Puzzle
        image={
          "https://fastly.picsum.photos/id/1083/480/480.jpg?hmac=V8U9GlhTWZMnPvppQxt4jJMFA4Q0pMPW2JchBVLUBLw"
        }
        rows={2}
        cols={2}
      />
    </>
  );
}

export default App;
