import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function TopSpenders() {

  const [customers, setCustomers] =
    useState([]);

  async function fetchTopSpenders() {

    try {

      const response =
        await api.get(
          "/customers/top-spenders"
        );

        console.log(response.data.data);
        
      setCustomers(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchTopSpenders();

  }, []);

  return (

    <div>

      <h1>
        Top Spenders
      </h1>

   <div className="cards-grid">

  {
    customers.map(customer => (

      <div
        className="customer-card"
        key={
          customer.customerId
        }
      >

        <h2>
          {
            customer.name ||
            customer.customerName
          }
        </h2>

        <p>

          Total Spending :

          ₹ {

            customer.totalSpent ||

            customer.totalSpending ||

            customer.totalAmountSpent ||

            customer.amount ||

            0

          }

        </p>

      </div>

    ))
  }

</div>

    </div>

  );

}

export default TopSpenders;