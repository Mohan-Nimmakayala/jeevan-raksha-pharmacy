import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

function Revenue() {

  const [report, setReport] =
    useState(null);

  async function fetchRevenue() {

    try {

      const response =
        await api.get(
          "/reports/revenue?from=2023-01-01&to=2027-12-31"
        );

      console.log(response.data);

      setReport(
        response.data.data
      );

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchRevenue();

  }, []);

  if (!report) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="dashboard-card">

      <h1>
        Total Revenue
      </h1>

      <p>
        ₹ {report.totalRevenue}
      </p>

      <h2>
        Total Orders
      </h2>

      <p>
        {report.orderCount}
      </p>

      <small>
        {report.from}
        {" "}
        to
        {" "}
        {report.to}
      </small>

    </div>

  );

}

export default Revenue;