import {
  Link
} from "react-router-dom";

import api
from "../services/api";

function MedicineCard({
  medicine,
  fetchMedicines
}) {

  async function deleteMedicine() {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this medicine?"
    );

  if (!confirmDelete) {

    return;

  }

  try {

    await api.delete(
      `/medicines/${medicine.medicineId}`
    );

    alert(
      "Medicine Deleted Successfully"
    );

    fetchMedicines();

  } catch (error) {

    console.log(error);

    if (
      error.response &&
      error.response.data
    ) {

      alert(
        error.response.data.message ||
        error.response.data ||
        "Cannot delete medicine because orders are linked."
      );

    } else {

      alert(
        "Something went wrong"
      );

    }

  }

}

  return (

    <div className="medicine-card">

      <div className="medicine-id">

        ID :
        {medicine.medicineId}

      </div>

      <h2>
        {medicine.name}
      </h2>

      <p>
        Category :
        {medicine.category}
      </p>

      <p>
        Price :
        ₹ {medicine.price}
      </p>

      <p>
        Stock :
        {medicine.stockQuantity}
      </p>

      <p>
        Expiry :
        {medicine.expiryDate}
      </p>

      <div className="card-actions">

        <Link
          className="edit-btn"
          to={`/edit-medicine/${medicine.medicineId}`}
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={deleteMedicine}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default MedicineCard;