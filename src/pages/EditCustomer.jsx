import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api
from "../services/api";

import getErrorMessage
from "../utils/getErrorMessage";

import Alert
from "../components/Alert";

function EditCustomer() {

  const { customerId } =
    useParams();

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

  async function fetchCustomer() {

    try {

      const response =
        await api.get(
          `/customers/${customerId}`
        );

      setCustomer(
        response.data.data
      );

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    }

  }

  useEffect(() => {

    fetchCustomer();

  }, []);

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

      await api.put(
        `/customers/${customerId}`,
        customer
      );

      alert(
        "Customer Updated"
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
        Edit Customer
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
          value={customer.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          value={customer.city}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Customer"}
        </button>

      </form>

    </div>

  );

}

export default EditCustomer;
