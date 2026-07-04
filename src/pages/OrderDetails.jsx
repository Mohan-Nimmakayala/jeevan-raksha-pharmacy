import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api
from "../services/api";

function OrderDetails() {

  const { orderId } =
    useParams();

  const [order, setOrder] =
    useState(null);

  async function fetchOrder() {

    try {

      const response =
        await api.get(
          `/orders/${orderId}`
        );

      console.log(response.data);

      setOrder(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchOrder();

  }, []);

  if (!order) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="order-details-container">

      {/* HEADER */}

      <div className="order-header">

        <div>

          <h1>
            Order Details
          </h1>

          <p>
            Complete order information
          </p>

        </div>

        <div className="order-status">

          {order.paymentMode}

        </div>

      </div>

      {/* ORDER SUMMARY */}

      <div className="order-summary-grid">

        <div className="summary-card">

          <h3>
            Order ID
          </h3>

          <p>
            #{order.orderId}
          </p>

        </div>

        <div className="summary-card">

          <h3>
            Customer
          </h3>

          <p>
            {order.customerName}
          </p>

        </div>

        <div className="summary-card">

          <h3>
            Order Date
          </h3>

          <p>
            {order.orderDate}
          </p>

        </div>

        <div className="summary-card">

          <h3>
            Total Amount
          </h3>

          <p>
            ₹ {order.totalAmount}
          </p>

        </div>

      </div>

      {/* ITEMS */}

      <div className="order-items-section">

        <h2>
          Medicines Ordered
        </h2>

        <div className="items-list">

          {
            order.items?.map(
              (item,index) => (

                <div
                  className="item-card"
                  key={index}
                >

                  <div className="item-left">

                    <h3>
                      💊
                      {" "}
                      {item.medicineName}
                    </h3>

                    <p>
                      Medicine ID :
                      {" "}
                      {item.medicineId}
                    </p>

                  </div>

                  <div className="item-right">

                    <span>
                      Qty :
                      {" "}
                      {item.quantity}
                    </span>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

      {/* PAYMENT */}

      <div className="payment-section">

        <h2>
          Payment Information
        </h2>

        <div className="payment-card">

          <p>
            Payment Mode :
            {" "}
            <strong>
              {order.paymentMode}
            </strong>
          </p>

          <p>
            Total Paid :
            {" "}
            <strong>
              ₹ {order.totalAmount}
            </strong>
          </p>

        </div>

      </div>

    </div>

  );

}

export default OrderDetails;