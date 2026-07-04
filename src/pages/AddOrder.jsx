import {
  useState
} from "react";

import api
from "../services/api";

import getErrorMessage
from "../utils/getErrorMessage";

import Alert
from "../components/Alert";

import {
  useNavigate
} from "react-router-dom";

function AddOrder() {

  const navigate =
    useNavigate();

 const [order, setOrder] =
  useState({
    customerId:"",
    medicineId:"",
    quantity:"",
    paymentMode:""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

 function handleChange(e) {

  setOrder({

    ...order,

    [e.target.name]:
    e.target.value

  });

}

async function handleSubmit(e) {

  e.preventDefault();
  setErrorMessage("");
  setSubmitting(true);

  try {

  const orderData = {
  customerId: Number(order.customerId),
  paymentMode: order.paymentMode,
  items: [
    {
      medicineId: Number(order.medicineId),
      quantity: Number(order.quantity),
    },
  ],
};

    await api.post(
      "/orders",
      orderData
    );

    alert(
      "Order Placed Successfully"
    );

    navigate("/orders");

  }

  catch (error) {

    // Surfaces backend messages such as:
    // "Customer with id 42 not found"
    // "Medicine with id 7 not found"
    // "Insufficient stock for Dolo 650: available 3, requested 10"
    setErrorMessage(getErrorMessage(error));

  } finally {
    setSubmitting(false);
  }

}
  return (

    <div className="form-container">

      <h1>
        Place Order
      </h1>

      <Alert
        type="error"
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="customerId"
          placeholder="Customer ID"
          value={order.customerId}
          onChange={handleChange}
        />

        <input
          type="number"
          name="medicineId"
          placeholder="Medicine ID"
          value={order.medicineId}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={handleChange}
        />

        <select
          name="paymentMode"
          value={order.paymentMode}
          onChange={handleChange}
        >

          <option value="">
            Select Payment
          </option>

          <option value="Cash">
            CASH
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Card">
            CARD
          </option>

        </select>

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>

      </form>

    </div>

  );

}

export default AddOrder;
