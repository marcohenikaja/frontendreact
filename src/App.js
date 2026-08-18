import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./page/Connexion";
import Vente from "./page/Vente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vente />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;