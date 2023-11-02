import Login from "./screen/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Footer from "./component/Footer";
import Register from "./screen/Register";
import Booking from "./screen/Booking";
import SeatSelection from "./screen/SeattSelection";
import Payment from "./screen/Payment";
import Report from "./screen/Admin/Report";
import AllPassenger from "./screen/Admin/AllPassengers";
import DateDestination from "./screen/Admin/DateDestination";
import DateType from "./screen/Admin/DateType";
import PastFlight from "./screen/Admin/PastFlight";
import Revenue from "./screen/Admin/Revenue";
import RegUserProfile from "./screen/RegUserProfile";
import Guest from "./screen/Guest";
import Delay from "./screen/Admin/Delay";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/HomeScreen" element={<HomeScreen />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Seatselection" element={<SeatSelection />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
          <Route path="/Report" element={<Report />}></Route>
          <Route path="/AllPassengers" element={<AllPassenger />} />
          <Route path="/DateDestination" element={<DateDestination />} />
          <Route path="/DateType" element={<DateType />} />
          <Route path="/PastFlight" element={<PastFlight />} />
          <Route path="/Revenue" element={<Revenue />} />
          <Route path="/Delay" element={<Delay />} />
          <Route
            path="/RegUserProfile/:username"
            element={<RegUserProfile />}
          />
          <Route path="/Guest" element={<Guest />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
