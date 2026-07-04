import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api
from "../services/api";

function OrderCard({
  order,
  fetchOrders
}) {

  const [items, setItems] =
    useState([]);

  async function fetchOrderDetails() {

    try {

      const response =
        await api.get(
          `/orders/${order.orderId}`
        );

      console.log(response.data);

      setItems(
        response?.data?.data?.items || []
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchOrderDetails();

  }, []);

  async function cancelOrder() {

    try {

      await api.delete(
        `/orders/${order.orderId}`
      );

      alert(
        "Order Cancelled"
      );

      fetchOrders();

    }

    catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="medicine-card">

      <div className="medicine-id">

        Order #{order.orderId}

      </div>

      <h2>
        {order.customerName}
      </h2>

      <p>
        Payment :
        {" "}
        {order.paymentMode}
      </p>

      <p>
        Amount :
        {" "}
        ₹{order.totalAmount}
      </p>

      <p>
        Date :
        {" "}
        {order.orderDate}
      </p>

      {/* ITEMS */}

      <div className="order-items">

        <h3>
          Medicines
        </h3>

        {
          items.map((item,index) => (

            <div
              key={index}
              className="order-item"
            >

              <p>
                💊
                {" "}
                {item.medicineName}
              </p>

              <span>
                Qty :
                {" "}
                {item.quantity}
              </span>

            </div>

          ))
        }

      </div>

      <div className="card-actions">

        <Link
          to={`/orders/${order.orderId}`}
          className="view-btn"
        >
          View
        </Link>

        <Link
          to={`/invoice/${order.orderId}`}
          className="edit-btn"
        >
          Invoice
        </Link>

        <button
          className="delete-btn"
          onClick={cancelOrder}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default OrderCard;