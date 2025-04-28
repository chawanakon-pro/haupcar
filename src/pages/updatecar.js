import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
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
        navigate("/");
        console.log(`Car with ID ${carId} updated successfully.`);
      } else {
        console.error("Failed to update car");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="UpdateCarForm">
      <h1>Update Car</h1>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input type="text" name="brand" value={car.car_id} disabled />
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={car.brand}
          onChange={handleChange}
        />
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
        />
        <label>Notes:</label>
        <input
          type="text"
          name="notes"
          value={car.notes}
          onChange={handleChange}
        />
        <label>Etc:</label>
        <input type="text" name="etc" value={car.etc} onChange={handleChange} />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default UpdateCarForm;
