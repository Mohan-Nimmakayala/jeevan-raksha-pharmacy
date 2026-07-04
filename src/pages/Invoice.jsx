import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api
from "../services/api";



function Invoice() {

  const { orderId } =
    useParams();

  const navigate =
    useNavigate();

  const [invoice, setInvoice] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchInvoice() {

    try {

      setLoading(true);

      const response =
        await api.get(
          `/orders/${orderId}/invoice`
        );

        console.log(response.data.data);
      setInvoice(
        response.data.data
      );

      setError("");

    } catch (error) {

      console.log(error);

      setError(
        "Failed to load invoice"
      );

    } finally {

      setLoading(false);

    }

  }

  function printInvoice() {

    window.print();

  }

  useEffect(() => {

    fetchInvoice();

  }, []);

  if (loading) {

    return (

      <div className="invoice-loading">

        <div className="loader"></div>

        <h2>
          Loading Invoice...
        </h2>

      </div>

    );

  }

  if (error) {

    return (

      <div className="invoice-error">

        <h2>
          {error}
        </h2>

        <button
          onClick={fetchInvoice}
        >
          Retry
        </button>

      </div>

    );

  }

  return (

    <div className="invoice-page">

      <div className="invoice-card">

        <div className="invoice-header">

          <div>

            <h1>
              Jeevan Raksha Pharmacy
            </h1>

            <p>
              Medical & Healthcare
            </p>

          </div>

          <div className="invoice-badge">

            PAID

          </div>

        </div>

        <div className="invoice-title">

          <h2>
            Invoice
          </h2>

          <p>
            Order Summary & Billing
          </p>

        </div>

        <div className="invoice-grid">

          <div className="invoice-box">

            <span>
              Invoice ID
            </span>

            <h3>
              #
              {invoice.invoiceNumber}

            </h3>

          </div>

          <div className="invoice-box">

            <span>
              Order ID
            </span>

            <h3>
              #{invoice.customerId}
            </h3>

          </div>

          <div className="invoice-box">

            <span>
              Customer
            </span>

            <h3>
              {invoice.customerName}
            </h3>

          </div>

          <div className="invoice-box">

            <span>
              Total Amount
            </span>

            <h3 className="amount">

              ₹ {invoice.totalAmount}

            </h3>

          </div>

        </div>

        <div className="invoice-footer">

          <p>
            Thank you for choosing
            Jeevan Raksha Pharmacy
          </p>

        </div>

        <div className="invoice-actions">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="print-btn"
            onClick={printInvoice}
          >
            Print Invoice
          </button>

        </div>

      </div>

    </div>

  );

}

export default Invoice;