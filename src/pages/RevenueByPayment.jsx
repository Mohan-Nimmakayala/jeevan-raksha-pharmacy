import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function RevenueByPayment() {

  const [payments, setPayments] =
    useState([]);

  async function fetchRevenue() {

    try {

      const response =
        await api.get(
          "/reports/revenue-by-payment-mode"
        );

      setPayments(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchRevenue();

  }, []);

  return (

    <div>

      <h1>
        Revenue By Payment Mode
      </h1>

      <div className="cards-grid">

        {
          payments.map((item,index) => (

            <div
              className="dashboard-card"
              key={index}
            >

              <h2>
                {item.paymentMode}
              </h2>

              <p>
                ₹ {item.totalRevenue}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default RevenueByPayment;