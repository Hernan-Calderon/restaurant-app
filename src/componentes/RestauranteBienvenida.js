import React from "react";

import Testimonios from "./Testimonios";
import Cards from "./Cards";
import CardsUser from "./CardsUser";

import food1 from "../imagenes/food1.jpg";
import food2 from "../imagenes/food2.jpg";
import food3 from "../imagenes/food3.jpg";

function RestauranteBienvenida({ user }) {
  return (
    <div className="container">
      <h1 style={{ color: "#491632" }}>Bienvenid@</h1>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <img src={food1} className="d-block w-100" alt="promocion 1" />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src={food2} className="d-block w-100" alt="promocion 2" />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src={food3} className="d-block w-100" alt="promocion 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br></br>
      <div>{user && user.rol === "user" ? <CardsUser /> : <Cards />}</div>
      <br></br>
      <Testimonios />
      <br></br>
    </div>
  );
}

export default RestauranteBienvenida;
