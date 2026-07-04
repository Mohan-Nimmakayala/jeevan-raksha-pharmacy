import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

function Inventory() {

  const [inventory, setInventory] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchInventory() {

    try {

      setLoading(true);

      const response =
        await api.get(
          "/inventory/low-stock"
        );

      setInventory(
        response.data.data
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchInventory();

  }, []);

  return (

    <div>

      <div className="page-header">

        <div>

          <h1>
            Inventory Alerts
          </h1>

          <p>
            Low stock medicines
          </p>

        </div>

      </div>

      {
        loading
        ? (
            <h2 className="loading">
              Loading Inventory...
            </h2>
          )
        : (

            <div className="cards-grid">

              {
                inventory.map(item => (

                  <div
                    key={item.medicineId}
                    className="low-stock-card"
                  >

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      Remaining Stock :
                      {item.stockQuantity}
                    </p>

                    <p>
                      Category :
                      {item.category}
                    </p>

                  </div>

                ))
              }

            </div>

          )
      }

    </div>

  );

}

export default Inventory;