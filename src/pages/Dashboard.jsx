import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api
from "../services/api";

function Dashboard() {

  const [medicineCount, setMedicineCount] =
    useState(0);

  const [customerCount, setCustomerCount] =
    useState(0);

  const [supplierCount, setSupplierCount] =
    useState(0);

  const [orderCount, setOrderCount] =
    useState(0);

  const [lowStockCount, setLowStockCount] =
    useState(0);

  const [expiredCount, setExpiredCount] =
    useState(0);

  const [topSpenders, setTopSpenders] =
    useState([]);

  async function fetchDashboard() {

    try {

      const medicinesResponse =
        await api.get("/medicines");

      const customersResponse =
        await api.get("/customers");

      const suppliersResponse =
        await api.get("/suppliers");

      const ordersResponse =
        await api.get("/orders");

      const lowStockResponse =
        await api.get(
          "/inventory/low-stock"
        );

      const expiredResponse =
        await api.get(
          "/reports/expired-medicines"
        );

      const topSpendersResponse =
        await api.get(
          "/customers/top-spenders"
        );

      setMedicineCount(

        medicinesResponse?.data?.data
        ?.content?.length ||

        medicinesResponse?.data?.data
        ?.length ||

        0

      );

      setCustomerCount(

        customersResponse?.data?.data
        ?.content?.length ||

        customersResponse?.data?.data
        ?.length ||

        0

      );

      setSupplierCount(

        suppliersResponse?.data?.data
        ?.content?.length ||

        suppliersResponse?.data?.data
        ?.length ||

        0

      );

      setOrderCount(

        ordersResponse?.data?.data
        ?.content?.length ||

        ordersResponse?.data?.data
        ?.length ||

        0

      );

      setLowStockCount(

        lowStockResponse?.data?.data
        ?.length || 0

      );

      setExpiredCount(

        expiredResponse?.data?.data
        ?.length || 0

      );

      setTopSpenders(

        topSpendersResponse?.data?.data || []

      );

    }

    catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (

    <div className="dashboard-page">

      {/* TOP */}

      <div className="dashboard-top">

        <h1>
          Dashboard
        </h1>

       

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stats-card">

          <span>💊</span>

          <h2>
            {medicineCount}
          </h2>

          <p>
            Total Medicines
          </p>

        </div>

        <div className="stats-card">

          <span>👤</span>

          <h2>
            {customerCount}
          </h2>

          <p>
            Total Customers
          </p>

        </div>

        <div className="stats-card">

          <span>🚚</span>

          <h2>
            {supplierCount}
          </h2>

          <p>
            Total Suppliers
          </p>

        </div>

        <div className="stats-card">

          <span>🛒</span>

          <h2>
            {orderCount}
          </h2>

          <p>
            Total Orders
          </p>

        </div>

        <div className="stats-card danger-card">

          <span>⚠️</span>

          <h2>
            {lowStockCount}
          </h2>

          <p>
            Low Stock Items
          </p>

        </div>

        <div className="stats-card expired-card">

          <span>🚫</span>

          <h2>
            {expiredCount}
          </h2>

          <p>
            Expired Medicines
          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="dashboard-section">

        <h2>
          💡 Quick Actions
        </h2>

        <div className="quick-actions">

          <Link
            to="/add-medicine"
            className="action-btn green-btn"
          >
            ➕ Add Medicine
          </Link>

          <Link
            to="/add-order"
            className="action-btn orange-btn"
          >
            🛒 Place Order
          </Link>

          <Link
            to="/add-customer"
            className="action-btn"
          >
            👤 Register Customer
          </Link>

          <Link
            to="/inventory"
            className="action-btn"
          >
            📦 Restock
          </Link>

        </div>

      </div>

      {/* TOP SPENDERS */}

      <div className="dashboard-section">

        <h2>
          🏆 Top Spenders
        </h2>

        {
          topSpenders.length > 0
          ? (

              topSpenders.map(customer => (

                <div
                  className="list-item"
                  key={customer.customerId}
                >

                  <span>

                    {customer.name}

                  </span>

                  <strong>

                    ₹
                    {" "}
                    {customer.totalSpent}

                  </strong>

                </div>

              ))

            )
          : (

              <p>
                No Top Spenders
              </p>

            )
        }

      </div>

    </div>

  );

}

export default Dashboard;