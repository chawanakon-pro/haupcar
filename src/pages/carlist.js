import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
      const response = await fetch(`http://localhost:5001/api/cars/${carId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCars(cars.filter((car) => car.car_id !== carId));
        console.log(`Car with ID ${carId} deleted successfully.`);
        Swal.fire({
          title: "Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="font-sans min-h-screen w-full flex flex-col items-center py-10 bg-gray-50">
      <h1 className="font-bold text-4xl text-gray-800">Car List</h1>
      <div className="w-11/12 lg:w-3/4 flex justify-between items-center mb-10">
        <h1 className="font-bold text-4xl text-gray-800"></h1>
        <Link to={`/create`}>
          <button className="px-4 py-2 border-2 text-green-500 border-green-500 rounded-md hover:bg-green-500 hover:text-white transition">
            Add new Car
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto w-11/12 lg:w-3/4 shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car number
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car brand
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car model
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Etc
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {cars.map((car) => (
              <tr
                key={car.car_id}
                className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition"
              >
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {car.car_id}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {car.brand}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {car.model}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {car.notes}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {car.etc}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <Link to={`/update/${car.car_id}`}>
                    <button className="px-4 py-2 border-2 text-blue-500 border-blue-500  rounded-md hover:bg-blue-500 hover:text-white transition">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(car.car_id)}
                    className="px-4 py-2 border-2 text-red-500 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
