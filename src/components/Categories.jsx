import React from "react";
import "../style/Categories.css";

function Categories() {
  return (
    <div className="categories">
      <div className="category-image">
        <img src={require("../img/chatgpt.jpg")} alt="category" />
      </div>

      <div className="category-image">
        <img src={require("../img/gemini.jpg")} alt="category" />
      </div>

      <div className="category-image">
        <img src={require("../img/wenxinyiyan.jpg")} alt="category" />
      </div>
    </div>
  );
}

export default Categories;
