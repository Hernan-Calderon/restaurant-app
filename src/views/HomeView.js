import React from "react";

import AdminView from "./administration/AdminView";
import RestaurantView from "./restaurant/RestaurantView";
import KitchenView from "./kitchen/KitchenView";
import WaiterView from "./waiter/WaiterView";
import CashierView from "./cashier/CashierView";
import CodeView from "./code/CodeView";

function HomeView({ user }) {
  let vista = <></>;

  switch (user.rol) {
    case "admin":
      vista = <AdminView user={user} />;
      break;
    case "cocina":
      vista = <KitchenView user={user} />;
      break;
    case "mesero":
      vista = <WaiterView user={user} />;
      break;
    case "cajero":
      vista = <CashierView user={user} />;
      break;
    case "codigo":
      vista = <CodeView user={user} />;
      break;
    default:
      vista = <RestaurantView user={user} />;
  }

  return <div>{vista}</div>;
}

export default HomeView;
