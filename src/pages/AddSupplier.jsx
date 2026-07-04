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

function AddSupplier() {

  const navigate =
    useNavigate();

  const [supplier, setSupplier] =
    useState({
      supplierName:"",
      contactPerson:"",
      phone:""
    });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {

    setSupplier({

      ...supplier,

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
        "/suppliers",
        supplier
      );

      alert(
        "Supplier Added"
      );

      navigate("/suppliers");

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    } finally {
      setSubmitting(false);
    }

  }

  return (

    <div className="form-container">

      <h1>
        Add Supplier
      </h1>

      <Alert
        type="error"
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={supplier.supplierName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={supplier.contactPerson}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={supplier.phone}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Supplier"}
        </button>

      </form>

    </div>

  );

}

export default AddSupplier;
