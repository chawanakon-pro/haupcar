import { useEffect, useState } from "react";
import "./styles/App.css";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      alert("car deleted");
      const response = await fetch(`http://localhost:5001/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCars(cars.filter((car) => car.car_id !== carId));
        console.log(`Car with ID ${carId} deleted successfully.`);
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="App">
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.car_id}>
            {/* {car.car_id} */}
            <h2>
              {car.brand} {car.model}
            </h2>
            <p>
              {car.notes} {car.etc}{" "}
              <button onClick={() => handleDelete(car.car_id)}>Delete</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
