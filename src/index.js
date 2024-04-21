import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';

// ReactDOM.render(<App />, document.getElementById("root"));
const container = document.getElementById("root"); // Get the container element
const root = createRoot(container); // Create a root instance using the container

root.render(
    <StrictMode>
      <App />
    </StrictMode>
  ); // Use the root instance to render your app
