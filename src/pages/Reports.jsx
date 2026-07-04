import {
  Link
} from "react-router-dom";

function Reports() {

  return (

    <div>

      <div className="page-header">

        <h1>
          Reports Dashboard
        </h1>

      </div>

      <div className="dashboard-grid">

        <Link
          to="/revenue"
          className="dashboard-card"
        >
          <h2>
            Revenue
          </h2>
        </Link>

        <Link
          to="/revenue-payment"
          className="dashboard-card"
        >
          <h2>
            Revenue By Payment
          </h2>
        </Link>

        <Link
          to="/inventory-audit"
          className="dashboard-card"
        >
          <h2>
            Inventory Audit
          </h2>
        </Link>

        <Link
          to="/expired-medicines"
          className="dashboard-card"
        >
          <h2>
            Expired Medicines
          </h2>
        </Link>

        <Link
          to="/bestsellers"
          className="dashboard-card"
        >
          <h2>
            Bestsellers
          </h2>
        </Link>

        <Link
          to="/customer-most-orders"
          className="dashboard-card"
        >
          <h2>
            Customer Most Orders
          </h2>
        </Link>

        <Link
          to="/search"
          className="dashboard-card"
        >
          <h2>
            Global Search
          </h2>
        </Link>

      </div>

    </div>

  );

}

export default Reports;