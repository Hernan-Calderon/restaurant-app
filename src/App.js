import React, { useState } from "react";

import Home from "./componentes/Home";
import RestauranteApp from "./componentes/RestauranteApp";
import CartProvider from "./context/RestauranteCartContext";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(db, `usuarios/${uid}`);
    const documento = await getDoc(docuRef);
    const infoRol = documento.data().rol;
    return infoRol;
  }

  function setUserRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        email: usuarioFirebase.email,
        uid: usuarioFirebase.uid,
        rol: rol,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <>
      <CartProvider>
        {user ? <Home user={user} /> : <RestauranteApp user={user} />}
      </CartProvider>
    </>
  );
}

export default App;
