import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api
from "../services/api";

function CustomerProfile() {

  const { customerId } =
    useParams();

  const [customer, setCustomer] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  async function fetchCustomer() {

    try {

      const customerResponse =
        await api.get(
          `/customers/${customerId}`
        );

      const ordersResponse =
        await api.get(
          `/customers/${customerId}/orders`
        );

      setCustomer(
        customerResponse.data.data
      );

      setOrders(
        ordersResponse.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchCustomer();

  }, []);

  if (!customer) {

    return <h2>Loading...</h2>;

  }

  return (

    <div>

      <div className="customer-card">

        <h1>
          {customer.name}
        </h1>

        <p>
          Email :
          {customer.email}
        </p>

        <p>
          Phone :
          {customer.phone}
        </p>

        <p>
          City :
          {customer.city}
        </p>

      </div>

      <h2 className="section-title">
        Order History
      </h2>

      <div className="cards-grid">

        {
          orders.map(order => (

            <div
              className="medicine-card"
              key={order.orderId}
            >

              <h2>
                Order :
                {order.orderId}
              </h2>

              <p>
                Amount :
                ₹ {order.totalAmount}
              </p>

              <p>
                Payment :
                {order.paymentMode}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default CustomerProfile;