import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function CustomerMostOrders() {

  const [customer, setCustomer] =
    useState(null);

  async function fetchCustomer() {

    try {

      const response =
        await api.get(
          "/reports/customer-with-most-orders"
        );

      console.log(response.data);

      setCustomer(
        response.data.data
      );

    }

    catch (error) {

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

    <div className="customer-card">

      <h1>
        {customer.name}
      </h1>

      <p>
        Total Orders :
        {" "}
        {customer.orderCount}
      </p>

      <p>
        Phone :
        {" "}
        {customer.phone}
      </p>

      <p>
        City :
        {" "}
        {customer.city}
      </p>

    </div>

  );

}

export default CustomerMostOrders;