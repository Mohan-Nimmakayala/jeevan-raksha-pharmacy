import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api
from "../services/api";

function SupplierProfile() {

  const { supplierId } =
    useParams();

  const [supplier, setSupplier] =
    useState(null);

  const [medicines, setMedicines] =
    useState([]);

  async function fetchSupplier() {

    try {

      const supplierResponse =
        await api.get(
          `/suppliers/${supplierId}`
        );

      const medicinesResponse =
        await api.get(
          `/suppliers/${supplierId}/medicines`
        );

      setSupplier(
        supplierResponse.data.data
      );

      setMedicines(
        medicinesResponse.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchSupplier();

  }, []);

  if (!supplier) {

    return <h2>Loading...</h2>;

  }

  return (

    <div>

      <div className="supplier-card">

        <h1>
          {supplier.supplierName}
        </h1>

        <p>
          Contact :
          {supplier.contactPerson}
        </p>

        <p>
          Phone :
          {supplier.phone}
        </p>

      </div>

      <h2 className="section-title">

        Supplier Medicines

      </h2>

      <div className="cards-grid">

        {
          medicines.length > 0
          ? (

              medicines.map(medicine => (

                <div
                  className="medicine-card"
                  key={medicine.medicineId}
                >

                  <h2>
                    {medicine.name}
                  </h2>

                  <p>
                    Category :
                    {medicine.category}
                  </p>

                  <p>
                    ₹ {medicine.price}
                  </p>

                </div>

              ))

            )
          : (

              <p>
                No Medicines Found
              </p>

            )
        }

      </div>

    </div>

  );

}

export default SupplierProfile;
