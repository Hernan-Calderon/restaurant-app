import React from "react";

import Cards from "../../components/Cards";

function WelcomeView({ user }) {
  return (
    <div className="container">
      <h1>Mesero Restaurante</h1>
      <p>Bienvenid@ {user.email}</p>
      <br></br>
      <Cards user={user} />
      <br></br>
    </div>
  );
}

export default WelcomeView;
