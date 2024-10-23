import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Navi from "./components/Navigation/Navi";
import Showtimes from "./components/Showtimes/Showtimes";
import Home from "./components/Home/Home";
import TicketPrice from "./components/TicketPrice/TicketPrice";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Bottom from "./components/Bottom/Bottom";

function App() {
  return (
    <Router>
      <div className="app-header">
        <Navi />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/ticketprice" element={<TicketPrice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <div className="app-bottom">
        <Bottom/>
      </div>
    </Router>
  );
}

export default App;
