// ContactUs.js
import React from "react";
import '../../style/ContactUs/ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or need further information, please reach out
        to us:
      </p>
      <div>
        <strong>Email:</strong>{" "}
        <a href="u3249995@uni.canberra.edu.au">u3249995@uni.canberra.edu.au</a>
      </div>
      <div>
        <strong>Phone:</strong> <a href="tel:+123456789">0401 040 131</a>
      </div>
      <div>
        <strong>Address:</strong>{" "}
        <p>University Drive, Bruce Australian Capital Territory 2617</p>
      </div>
    </div>
  );
}

export default ContactUs;
