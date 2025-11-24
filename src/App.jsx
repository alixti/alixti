import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
//import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import './css/App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <Navbar />
        <div
          key={location.pathname}
          className="page-wrapper"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
