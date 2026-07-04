import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api
from "../services/api";

import getErrorMessage
from "../utils/getErrorMessage";

import Alert
from "../components/Alert";

function AddCustomer() {

  const navigate =
    useNavigate();

  const [customer, setCustomer] =
    useState({
      name:"",
      phone:"",
      city:""
    });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {

    setCustomer({

      ...customer,

      [e.target.name]:
      e.target.value

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {

      await api.post(
        "/customers",
        customer
      );

      alert(
        "Customer Added"
      );

      navigate("/customers");

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    } finally {
      setSubmitting(false);
    }

  }

  return (

    <div className="form-container">

      <h1>
        Add Customer
      </h1>

      <Alert
        type="error"
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Customer"}
        </button>

      </form>

    </div>

  );

}

export default AddCustomer;
