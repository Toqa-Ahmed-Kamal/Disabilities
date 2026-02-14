import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./components/LandingPage/LandingPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MainLayout />} />
          <Route path="/map-page" element={<MapPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
