import {
  Link
} from "react-router-dom";

import api
from "../services/api";

function CustomerCard({
  customer,
  fetchCustomers
}) {

  async function deleteCustomer() {

    try {

      await api.delete(
        `/customers/${customer.customerId}`
      );

      alert(
        "Customer Deleted"
      );

      fetchCustomers();

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="customer-card">

      <div className="medicine-id">

        ID :
        {customer.customerId}

      </div>

      <h2>
        {customer.name}
      </h2>

   

      <p>
        Phone :
        {customer.phone}
      </p>

      <p>
        City :
        {customer.city}
      </p>

      <div className="card-actions">

        <Link
          to={`/customer/${customer.customerId}`}
          className="view-btn"
        >
          View
        </Link>

        <Link
          to={`/edit-customer/${customer.customerId}`}
          className="edit-btn"
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={deleteCustomer}
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default CustomerCard;