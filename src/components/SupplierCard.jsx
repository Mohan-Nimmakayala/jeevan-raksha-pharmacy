import {
  Link
} from "react-router-dom";

import api
from "../services/api";

function SupplierCard({
  supplier,
  fetchSuppliers
}) {

  async function deleteSupplier() {

    try {

      await api.delete(

        `/suppliers/${supplier.supplierId}`

      );

      alert(
        "Supplier Deleted"
      );

      fetchSuppliers();

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="supplier-card">

      <div className="medicine-id">

        ID :
        {supplier.supplierId}

      </div>

      <h2>
        {supplier.supplierName}
      </h2>

      <p>
        Contact :
        {supplier.contactPerson}
      </p>

      <p>
        Phone :
        {supplier.phone}
      </p>

      <div className="card-actions">

        <Link
          to={`/supplier/${supplier.supplierId}`}
          className="view-btn"
        >
          View
        </Link>

        <Link
          to={`/edit-supplier/${supplier.supplierId}`}
          className="edit-btn"
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={deleteSupplier}
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default SupplierCard;