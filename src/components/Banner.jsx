import React from "react";

function Banner() {
    return (
      <div class="p-5 mb-4 bg-body-tertiary rounded-3">
  <div class="container-fluid py-5">
    <div class="row">
      {/* Column for the content */}
      <div class="col-md-8">
        <h1 class="display-5 fw-bold">Custom jumbotron</h1>
        <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.

        {/* a search box */}
        <form class="d-flex">
          <input class="form-control me-2 col-md-4" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
        </p>
      </div>

      {/* Column for the image */}
      <div class="col-md-4 mb-3">
        <img src="bannerPicture.jpg" class="img-fluid" alt="Your Image" />
      </div>
    </div>
  </div>
</div>
    );
  }
  
  export default Banner;