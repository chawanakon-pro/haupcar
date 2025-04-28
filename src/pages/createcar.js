import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function CreateCarForm() {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    car_id: "",
    brand: "",
    model: "",
    notes: "",
    etc: "",
  });
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
    const createdCar = { ...car };

    try {
      const response = await fetch(`http://localhost:5001/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdCar),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        Swal.fire({
          title: "Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        console.log(`Car created successfully.`);
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Failed to create car");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error creating car:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Car
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">ID</label>
              <input
                type="text"
                name="car_id"
                value={car.car_id}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
            >
              Create Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCarForm;
