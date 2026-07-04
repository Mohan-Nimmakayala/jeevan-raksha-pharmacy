import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function InventoryAudit() {

  const [inventory, setInventory] =
    useState([]);

  async function fetchInventory() {

    try {

      const response =
        await api.get(
          "/reports/inventory-audit"
        );

      console.log(response.data);

      setInventory(
        response.data.data
      );

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchInventory();

  }, []);

  return (

    <div>

      <h1>
        Inventory Audit
      </h1>

      <div className="cards-grid">

        {
          inventory?.map(item => (

            <div
              className="medicine-card"
              key={item.medicineId}
            >

              <h2>
                {item.medicineName}
              </h2>

              <p>
                Stock :
                {" "}
                {item.stockQuantity}
              </p>

              <p>
                Category :
                {" "}
                {item.category}
              </p>

              <p>
                Expiry :
                {" "}
                {item.expiryDate}
              </p>

              <p>
                Supplier :
                {" "}
                {item.supplierName}
              </p>

              <p>
                Contact :
                {" "}
                {item.supplierContact}
              </p>

              <p>
                Phone :
                {" "}
                {item.supplierPhone}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default InventoryAudit;