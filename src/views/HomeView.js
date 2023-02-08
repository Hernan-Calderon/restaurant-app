import React from "react";

import AdminView from "./administration/AdminView";
import RestaurantView from "./restaurant/RestaurantView";
import KitchenView from "./kitchen/KitchenView";

function HomeView({ user }) {
  let vista = <></>;

  switch (user.rol) {
    case "admin_tienda":
      vista = <AdminView user={user} />;
      break;
    case "cocina":
      vista = <KitchenView user={user} />;
      break;
    default:
      vista = <RestaurantView user={user} />;
  }

  return <div>{vista}</div>;
}

export default HomeView;
