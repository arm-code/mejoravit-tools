import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { MejoravitProvider } from "./features/mejoravit/context/MejoravitContext";
import { MejoravitPage } from "./features/mejoravit/pages/MejoravitPage";
import { MontosPage } from "./features/mejoravit/pages/MontosPage";
import { MainPage } from "./features/mejoravit/pages/MainPage";

function App() {
  return (
    // HashRouter usa /#/ruta → compatible con GitHub Pages (sin 404 en reload)
    <HashRouter>
      <MejoravitProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/montos" element={<MontosPage />} />
          <Route path="/calculadora" element={<MejoravitPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MejoravitProvider>
    </HashRouter>
  );
}

export default App;
