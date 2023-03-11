import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function BtnPaypal({ totalDolares, actualizarPago }) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalDolares,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture(actualizarPago());
  };

  Swal.fire(
    "Información",
    "¡El pago realizado a través de Paypal se realizará en dólares estadounidenses. La transferencia estará sujeta a la tasa de cambio del día!",
    "info"
  );

  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
}

export default BtnPaypal;
