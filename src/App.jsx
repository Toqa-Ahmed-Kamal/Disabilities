import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./components/LandingPage/LandingPage";
import MapPage from "./pages/MapPage";
import MapPage2 from "./pages/MapPage2";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MainLayout />} />
          <Route path="/map-page" element={<MapPage />} />
          <Route path="/map-page2" element={<MapPage2 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
