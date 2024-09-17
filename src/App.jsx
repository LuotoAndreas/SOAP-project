import React from "react";
import "./App.css"; // Import the CSS file

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="input-group">
        <label>Destination</label>
        <input type="text" placeholder="Enter destination" />
        <button type="button">Search</button>
      </div>

      <div className="input-group">
        <label>Currency</label>
        <input type="text" placeholder="Currency name" />
        <select name="currency" id="currencies">
          <option value="Euro">Euro</option>
          <option value="Dollar">Dollar</option>
          <option value="Pound">Pound</option>
          <option value="Fran">Fran</option>
          <option value="Yen">Yen</option>
        </select>
      </div>

      <div className="input-group">
        <label>To</label>
        <select name="currency" id="currencies">
          <option value="Euro">Euro</option>
          <option value="Dollar">Dollar</option>
          <option value="Pound">Pound</option>
          <option value="Fran">Fran</option>
          <option value="Yen">Yen</option>
        </select>
        <button type="button">Convert</button>
      </div>

      <div className="input-group">
        <label>Temperature</label>
        <input type="text" placeholder="Enter temperature" />
        <div className="temp-buttons">
          <button type="button">To Celsius</button>
          <button type="button">To Fahrenheit</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <h1>Travel Helper</h1>
      <SearchBox />
    </div>
  );
};

export default App;
