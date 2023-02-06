import React from "react";

import AdminView from "../componentes/AdminView";
import RestauranteApp from "./RestauranteApp";
import KitchenView from "./KitchenView";

function Home({ user }) {
  let vista = <></>;

  switch (user.rol) {
    case "admin_tienda":
      vista = <AdminView user={user} />;
      break;
    case "cocina":
      vista = <KitchenView user={user} />;
      break;
    default:
      vista = <RestauranteApp user={user} />;
  }

  return <div>{vista}</div>;
}

export default Home;
