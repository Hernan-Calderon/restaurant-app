import React, { useEffect, useState } from "react";

import firebaseApp from "../../firebase/credenciales";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

function WelcomeView({ code }) {
  const db = getFirestore(firebaseApp);
  const [codigo, setCodigo] = useState(code);

  function actualizarCodigo() {
    let num = Math.floor(Math.random() * 9000 + 1000);

    async function updateDocument() {
      const docRef = doc(db, "codigo/codigo");
      try {
        await updateDoc(docRef, {
          codigo: num,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    updateDocument();
    setCodigo(num);
  }

  useEffect(() => {
    const updateId = setInterval(() => actualizarCodigo(), 1000 * 60 * 10);

    return function cleanup() {
      clearInterval(updateId);
    };
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-l-3"></div>
        <div className="col-l-6">
          <div className="code_titulo">Código restaurante:</div>
          <div className="code_font">{codigo}</div>
        </div>
        <div className="col-l-3"></div>
      </div>
    </div>
  );
}

export default WelcomeView;
