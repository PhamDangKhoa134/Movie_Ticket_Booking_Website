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
import Bottom from "./components/Bottom/Bottom";
import MMovie from "./components/ManageMovie/MMovie";
import Movie from "./components/Movie/Movie";
import User from "./components/User/User";
import Payment from "./components/Payment/Payment";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteAuth from "./ProtectedRouteAuth";
import MUser from "./components/ManageUser/MUser";
import ReturnPayment from "./components/Payment/ReturnPayment";


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
          <Route path="/manageMovie" element={<ProtectedRouteAuth element={MMovie} />}/>
          <Route path="/manageUser" element={<ProtectedRouteAuth element={MUser} />}/>
          <Route
            path="/movie/:id"
            element={<Movie />}
          />
          <Route
            path="/user/:id"
            element={<ProtectedRoute element={User} />}
          />
          <Route
            path="/payment"
            element={<ProtectedRoute element={Payment} />}
          />
          <Route
            path="/return-payment"
            element={<ProtectedRoute element={ReturnPayment} />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <div className="app-bottom">
        <Bottom />
      </div>
    </Router>
  );
}

export default App;
