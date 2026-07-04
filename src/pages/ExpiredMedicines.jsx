import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function ExpiredMedicines() {

  const [medicines, setMedicines] =
    useState([]);

  async function fetchExpired() {

    try {

      const response =
        await api.get(
          "/reports/expired-medicines"
        );

      setMedicines(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchExpired();

  }, []);

  return (

    <div>

      <h1>
        Expired Medicines
      </h1>

      <div className="cards-grid">

        {
          medicines.map(medicine => (

            <div
              className="medicine-card"
              key={medicine.medicineId}
            >

              <h2>
                {medicine.name}
              </h2>

              <p>
                Expiry :
                {medicine.expiryDate}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default ExpiredMedicines;