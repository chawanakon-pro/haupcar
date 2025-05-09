import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function UpdateCarForm() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    car_id: carId,
    brand: "",
    model: "",
    notes: "",
    etc: "",
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cars/${carId}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const brands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];

  const brandModels = {
    Toyota: ["Yaris", "Camry", "Cross"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["Focus", "Mustang", "Explorer"],
    BMW: ["i8", "X5", "M3"],
    Mercedes: ["C-Class", "E-Class", "GLA"],
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,

      ...(name === "brand" ? { model: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCar = { ...car };

    try {
      const response = await fetch(`http://localhost:5001/api/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (response.ok) {
        Swal.fire({
          title: "Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        console.log(`Car with ID ${carId} updated successfully.`);
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Failed to update car");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Update Car
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Car number
              </label>
              <input
                type="text"
                name="car_id"
                value={car.car_id}
                readOnly
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Brand
              </label>
              <select
                name="brand"
                value={car.brand}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Model
              </label>
              <select
                name="model"
                value={car.model}
                onChange={handleChange}
                disabled={!car.brand}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a model</option>
                {car.brand &&
                  brandModels[car.brand]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                value={car.notes}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Etc
              </label>
              <input
                type="text"
                name="etc"
                value={car.etc}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCarForm;
