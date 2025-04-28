import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Notes</th>
              <th>Etc.</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {cars.map((car) => (
            <tbody key={car.car_id}>
              <tr>
                <td>{car.car_id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.notes}</td>
                <td>{car.etc}</td>
                <td>
                  <Link to={`/update/${car.car_id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(car.car_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </ul>
    </div>
  );
}
export default App;
