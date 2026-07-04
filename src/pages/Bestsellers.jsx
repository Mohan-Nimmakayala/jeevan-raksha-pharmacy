
import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

function Bestsellers() {

  const [medicines, setMedicines] =
    useState([]);

  async function fetchBestsellers() {

    try {

      const response =
        await api.get(
          "/reports/bestsellers"
        );

      console.log(response.data);

      setMedicines(
        response.data.data
      );

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchBestsellers();

  }, []);

  return (

    <div className="page-container">

      <h1>
        Bestselling Medicines
      </h1>

      <div className="cards-grid">

        {
          medicines?.map(medicine => (

            <div
              className="medicine-card"
              key={medicine.medicineId}
            >

              <h2>
                {medicine.medicineName}
              </h2>

              <p>
                Category :
                {" "}
                {medicine.category}
              </p>

              <p>
                Price :
                {" "}
                ₹{medicine.price}
              </p>

              <p>
                Total Sold :
                {" "}
                {medicine.totalQuantitySold}
              </p>

              <p>
                Revenue :
                {" "}
                ₹{medicine.totalRevenue}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Bestsellers;

