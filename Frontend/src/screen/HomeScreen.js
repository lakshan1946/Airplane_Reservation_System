import React, { useState } from "react";
import Navbar from "../component/Navbar";

const HomeScreen = () => {
  //About us
  return (
    <div className="background">
      <Navbar />
      <div className="homecomp">
        <div className="">
          <h2>About Us</h2>
          <p>
            Welcome to B Airways, where flying is not just a journey. it's an
            experience that soars above the ordinary. As a proud subsidiary of
            Virgin Airlines, we bring the exceptional standards and spirit of
            innovation that Virgin is renowned for to the skies. Our team
            comprises individuals who possess an innate understanding of
            aviation, ensuring that every flight with B Airways is a seamless
            and unforgettable adventure. We believe that some people just know
            how to fly, and our passion for aviation is evident in every detail
            of your journey with us. From world-class service to unparalleled
            comfort, join us in experiencing the magic of flight as it was meant
            to be.
          </p>
        </div>
      </div>

      <div className="Homecont">
        <div className="Homecontsub">
          <div className="">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="/images/plane.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="/images/plane2.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="/images/plane3.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
