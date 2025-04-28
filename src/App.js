import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import CarList from "./pages/carlist.js";
import CreateCar from "./pages/createcar.js";
import UpdateCarForm from "./pages/updatecar.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/create" element={<CreateCar />} />
        <Route path="/update/:carId" element={<UpdateCarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
