import {
  useEffect,
  useState
} from "react";

import { Link }
from "react-router-dom";

import api
from "../services/api";

import CustomerCard
from "../components/CustomerCard";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [city, setCity] =
    useState("");

  const [page, setPage] =
    useState(0);

  const [size, setSize] =
    useState(10);

  async function fetchCustomers() {

    try {

      setLoading(true);

      const response =
        await api.get(
          "/customers",
          {
            params:{
              city,
              page,
              size
            }
          }
        );

      setCustomers(
        response?.data?.data?.content ||
        response?.data?.data ||
        []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchCustomers();

  }, []);

  return (

    <div>

      <div className="page-header">

        <h1>
          Customers
        </h1>

        <Link
          to="/add-customer"
          className="add-btn"
        >
          Add Customer
        </Link>

      </div>

      {/* FILTERS */}

      <div className="dashboard-section">

        <div className="api-header">

          <h2>
            👤 All Customers
          </h2>

          <span className="api-tag">
            GET /api/customers
          </span>

        </div>

        <div className="filters">

          <div className="filter-box">

            <label>
              Filter by City
            </label>

            <input
              type="text"
              placeholder="Hyderabad"
              value={city}
              onChange={(e)=>
                setCity(e.target.value)
              }
            />

          </div>

          <div className="filter-box">

            <label>
              Page
            </label>

            <input
              type="number"
              value={page}
              onChange={(e)=>
                setPage(e.target.value)
              }
            />

          </div>

          <div className="filter-box">

            <label>
              Size
            </label>

            <input
              type="number"
              value={size}
              onChange={(e)=>
                setSize(e.target.value)
              }
            />

          </div>

        </div>

        <div className="filter-actions">

          <button
            className="add-btn"
            onClick={fetchCustomers}
          >
            🔍 Fetch Customers
          </button>

          <Link
            to="/top-spenders"
            className="outline-btn"
          >
            🏆 Top Spenders
          </Link>

        </div>

      </div>

      {loading && (
        <p>Loading Customers...</p>
      )}

      <div className="cards-grid">

        {
          customers.length > 0
          ? (

              customers.map(customer => (

                <CustomerCard
                  key={
                    customer.customerId
                  }
                  customer={customer}
                  fetchCustomers={fetchCustomers}
                />

              ))

            )
          : (
              !loading &&
              <p>
                No customers found
              </p>
            )
        }

      </div>

    </div>

  );

}

export default Customers;