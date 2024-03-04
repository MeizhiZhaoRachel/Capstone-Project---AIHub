import React from "react";

function Categories() {
    return (
        <div class="container px-4 py-5" id="custom-cards">
    <h2 class="pb-2 border-bottom">Custom cards</h2>

    <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
    <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 py-3">
        <h2 class="display-5">ChatGPT</h2>
        <p class="lead">OPEN AI</p>
      </div>
      <div class="bg-body-tertiary shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}>
        <img src="chatgpt.jpg" class="img-fluid" alt="Your Image" />
      </div>
    </div>
    <div class="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 p-3">
        <h2 class="display-5">Gemini</h2>
        <p class="lead">GOOGLE</p>
      </div>
      <div class="bg-dark shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}>
      <img src="chatgpt.jpg" class="img-fluid" alt="Your Image" /></div>
    </div>
  </div>
  </div>
    );
}

export default Categories;