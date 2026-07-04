
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import OrderCard from "../components/OrderCard";

function Orders() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [orders, setOrders] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setErrorMessage("");

      let response;

      if (paymentMode) {
        response = await api.get(
          `/orders/by-payment-mode/${paymentMode}`
        );
      } else {
        response = await api.get("/orders");
      } 

      console.log(response.data);

      setOrders(
  response?.data?.data?.content ||
  response?.data?.data ||
  []
);

    } catch (error) {
      console.log("Fetch Orders Error:", error);

      setErrorMessage(
        error?.response?.data?.message ||
        "Failed to fetch orders"
      );

      setOrders([]);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [paymentMode]);

  async function filterByDate() {

    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      console.log("FROM:", startDate);
      console.log("TO:", endDate);

      const response = await api.get(
        "/orders/by-date-range",
        {
          params: {
            from: startDate,
            to: endDate,
          },
        }
      );

      console.log(response.data);

    setOrders(response.data.data);

    } catch (error) {

      console.log("ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      setErrorMessage(
        error?.response?.data?.message ||
        "Failed to filter orders"
      );

      setOrders([]);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <div className="page-header">
        <h1>Orders</h1>
      </div>

      <div className="filters">
   <select
          value={paymentMode}
          onChange={(e) =>
            setPaymentMode(e.target.value)
          }
        >
          <option value="">
            All Payments
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
        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={filterByDate}
        >
          Filter Dates
        </button>

     
      <Link
        to="/add-order"
        className="add-btn"
      >
        Add Order
      </Link>

      </div>


      {loading && (
        <p>Loading orders...</p>
      )}

      {errorMessage && (
        <p>{errorMessage}</p>
      )}

      <div className="cards-grid">

        {orders.length > 0 ? (

          orders.map((order) => (

            <OrderCard
              key={order.orderId}
              order={order}
              fetchOrders={fetchOrders}
            />

          ))

        ) : (

          !loading && (
            <p>No orders found</p>
          )

        )}

      </div>

    </div>
  );
}

export default Orders;

